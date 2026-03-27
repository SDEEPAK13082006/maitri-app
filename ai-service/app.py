"""
MAITRI AI Service
Flask API for emotion detection, response generation, and health recommendations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from models import EmotionAnalyzer, ResponseGenerator, RecommendationEngine
import os
from dotenv import load_dotenv
import traceback

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['JSON_SORT_KEYS'] = False
PORT = int(os.getenv('PORT', 5001))

# ==================== ENDPOINTS ====================

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'MAITRI AI Service is running',
        'service': 'emotion-detection',
    }), 200


@app.route('/analyze-emotion', methods=['POST'])
def analyze_emotion():
    """
    Analyze emotion from user text
    
    Expected input:
    {
        "text": "I'm feeling really stressed about the mission..."
    }
    
    Returns:
    {
        "sentiment": "negative",
        "emotions": [...],
        "confidence": 0.85,
        ...
    }
    """
    try:
        data = request.json
        
        if not data or 'text' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required field: text',
            }), 400
        
        text = data['text']
        
        # Analyze emotion
        analysis = EmotionAnalyzer.analyze(text)
        
        return jsonify({
            'success': True,
            'data': analysis,
        }), 200
    
    except Exception as e:
        print(f'Error in analyze-emotion: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e),
        }), 500


@app.route('/generate-response', methods=['POST'])
def generate_response():
    """
    Generate AI response based on emotion analysis
    
    Expected input:
    {
        "message": "I'm feeling really stressed...",
        "emotionAnalysis": {...}  // Optional, will be auto-generated if not provided
    }
    
    Returns:
    {
        "response": "Here's my supportive response...",
        "suggestions": [...],
        ...
    }
    """
    try:
        data = request.json
        
        if not data or 'message' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required field: message',
            }), 400
        
        message = data['message']
        
        # Get or generate emotion analysis
        emotion_analysis = data.get('emotionAnalysis')
        if not emotion_analysis:
            emotion_analysis = EmotionAnalyzer.analyze(message)
        
        # Generate response
        response_data = ResponseGenerator.generate(message, emotion_analysis)
        
        return jsonify({
            'success': True,
            'response': response_data['response'],
            'suggestions': response_data['suggestions'],
            'primary_emotion': response_data['primary_emotion'],
        }), 200
    
    except Exception as e:
        print(f'Error in generate-response: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e),
        }), 500


@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    """
    Generate health recommendations
    
    Expected input:
    {
        "mood_score": 5,
        "sleep_hours": 6,
        "hydration_ml": 2000,
        "exercise_minutes": 30,
        "stress_level": 7
    }
    
    Returns:
    {
        "suggestions": [...],
        "priority": "high"
    }
    """
    try:
        data = request.json or {}
        
        # Extract parameters
        mood_score = data.get('mood_score')
        sleep_hours = data.get('sleep_hours')
        hydration_ml = data.get('hydration_ml')
        exercise_minutes = data.get('exercise_minutes')
        stress_level = data.get('stress_level')
        
        # Generate recommendations
        recommendations = RecommendationEngine.generate(
            mood_score=mood_score,
            sleep_hours=sleep_hours,
            hydration_ml=hydration_ml,
            exercise_minutes=exercise_minutes,
            stress_level=stress_level,
        )
        
        return jsonify({
            'success': True,
            'suggestions': recommendations['suggestions'],
            'priority': recommendations['priority'],
        }), 200
    
    except Exception as e:
        print(f'Error in recommendations: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e),
        }), 500


@app.route('/batch-analyze', methods=['POST'])
def batch_analyze():
    """
    Analyze multiple messages in batch
    
    Expected input:
    {
        "messages": ["message1", "message2", ...]
    }
    """
    try:
        data = request.json
        
        if not data or 'messages' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required field: messages',
            }), 400
        
        messages = data['messages']
        
        if not isinstance(messages, list):
            return jsonify({
                'success': False,
                'error': 'Messages must be a list',
            }), 400
        
        # Analyze all messages
        results = []
        for msg in messages:
            analysis = EmotionAnalyzer.analyze(msg)
            results.append(analysis)
        
        return jsonify({
            'success': True,
            'count': len(results),
            'results': results,
        }), 200
    
    except Exception as e:
        print(f'Error in batch-analyze: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e),
        }), 500


# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found',
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'error': 'Internal server error',
    }), 500


# ==================== MAIN ====================

if __name__ == '__main__':
    print(f"""
====================================
  🚀 MAITRI AI Service Started
====================================
  🌐 Service URL: http://localhost:{PORT}
  🧠 AI Model: Emotion Detection v1.0
  📦 Environment: {os.getenv('FLASK_ENV', 'production')}
  ✓ Ready to process emotions
====================================
    """)
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=PORT,
        debug=os.getenv('DEBUG', 'False') == 'True',
    )
