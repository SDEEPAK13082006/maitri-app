# AI Emotion Detection and Analysis Module
# Provides emotion detection, sentiment analysis, and response generation

from textblob import TextBlob
import re

class EmotionAnalyzer:
    """
    Analyzes emotions from user text using TextBlob and keyword matching
    """
    
    # Emotion keywords database
    EMOTION_KEYWORDS = {
        'happy': ['happy', 'joyful', 'excited', 'great', 'wonderful', 'amazing', 'excellent', 'fantastic'],
        'sad': ['sad', 'depressed', 'upset', 'miserable', 'unhappy', 'down', 'lonely', 'grief'],
        'anxious': ['anxious', 'worried', 'nervous', 'afraid', 'scared', 'stressed', 'panic', 'tense'],
        'angry': ['angry', 'frustrated', 'mad', 'furious', 'irritated', 'annoyed', 'enraged'],
        'stressed': ['stressed', 'overwhelmed', 'exhausted', 'burnt', 'pressure', 'pressure', 'overloaded'],
        'relaxed': ['relaxed', 'calm', 'peaceful', 'comfortable', 'content', 'serene', 'chill'],
        'tired': ['tired', 'fatigue', 'exhausted', 'sleepy', 'drained', 'weary'],
        'energetic': ['energetic', 'motivated', 'active', 'vibrant', 'lively', 'spirited'],
    }
    
    @classmethod
    def analyze(cls, text):
        """
        Analyze emotion from text
        
        Returns:
            dict: Contains sentiment, emotions detected, and confidence scores
        """
        if not text or not text.strip():
            return {
                'sentiment': 'neutral',
                'confidence': 0.5,
                'emotions': []
            }
        
        text_lower = text.lower()
        
        # Get sentiment using TextBlob
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # -1 (negative) to 1 (positive)
        
        # Convert polarity to sentiment label
        if polarity > 0.2:
            sentiment = 'positive'
        elif polarity < -0.2:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        # Detect emotions from keywords
        emotions = cls._detect_emotions(text_lower)
        
        # Calculate confidence based on polarity
        confidence = abs(polarity)
        
        return {
            'sentiment': sentiment,
            'emotions': emotions,
            'confidence': min(confidence, 1.0),
            'polarity': float(polarity),
            'raw_text': text[:100],  # First 100 chars for logging
        }
    
    @classmethod
    def _detect_emotions(cls, text_lower):
        """
        Detect emotions using keyword matching
        
        Returns:
            list: List of dicts with emotion name and confidence
        """
        detected = []
        text_words = set(text_lower.split())
        
        for emotion, keywords in cls.EMOTION_KEYWORDS.items():
            # Check if any keyword matches
            matches = sum(1 for keyword in keywords if keyword in text_lower)
            
            if matches > 0:
                # Calculate confidence based on number of matches
                confidence = min(matches * 0.3, 0.95)
                detected.append({
                    'emotion': emotion,
                    'confidence': confidence,
                    'matches': matches,
                })
        
        # Sort by confidence
        detected.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Return top 3 emotions
        return detected[:3]


class ResponseGenerator:
    """
    Generates supportive AI responses based on emotion analysis
    """
    
    # Response templates based on emotion
    RESPONSE_TEMPLATES = {
        'happy': [
            "It's wonderful to hear that you're feeling happy! Keep up that positive energy. 🌟",
            "That's great news! Your positive mood is inspiring. How can I support you further?",
            "I'm glad you're in a good place right now. Cherish these moments!",
        ],
        'sad': [
            "I'm here for you during this difficult time. Have you tried talking to someone you trust?",
            "It's okay to feel sad sometimes. Consider doing something you enjoy today.",
            "Your feelings are valid. Would a guided meditation or breathing exercise help?",
        ],
        'anxious': [
            "Anxiety can be overwhelming. Let's try a grounding exercise to help you feel more calm.",
            "You're not alone in feeling anxious. A breathing exercise might help right now.",
            "Consider breaking your worries into smaller, manageable tasks.",
        ],
        'angry': [
            "It's okay to feel frustrated. Taking a break and breathe might help you process.",
            "Anger is a valid emotion. Perhaps taking a walk or exercise could help release the tension.",
            "Let's talk about what's making you angry. I'm here to listen.",
        ],
        'stressed': [
            "You sound stressed. Remember to take breaks and be kind to yourself.",
            "Stress can be managed with relaxation techniques. Would you like to try meditation?",
            "Focus on what you can control and let go of what you can't for now.",
        ],
        'relaxed': [
            "Wonderful! You sound at peace. How can I help you maintain this calm state?",
            "It's great that you're feeling relaxed. Enjoy this peaceful moment!",
        ],
        'tired': [
            "It sounds like you need rest. Getting adequate sleep is crucial for your wellbeing.",
            "Fatigue can affect everything. Consider taking some time to refresh yourself.",
            "Your body might be telling you it needs rest. Listen to it!",
        ],
        'energetic': [
            "Your energy is amazing! This is a great time to accomplish your goals.",
            "I can feel your enthusiasm! How are you planning to use this motivation?",
            "That's fantastic energy! Keep channeling it into positive actions.",
        ],
        'neutral': [
            "How are you feeling today? I'm here to listen and support you.",
            "Tell me more about what's on your mind. I'm here to help.",
            "I'm ready to listen. What would you like to share with me?",
        ],
    }
    
    # Suggestions based on emotion
    SUGGESTIONS = {
        'happy': [
            'Share your joy with someone',
            'Capture this moment in your journal',
            'Continue with productive activities',
        ],
        'sad': [
            'Try a 5-minute guided meditation',
            'Reach out to a friend or family member',
            'Do something you enjoy',
            'Journal about your feelings',
        ],
        'anxious': [
            'Try the 4-7-8 breathing technique',
            'Go for a walk in fresh air',
            'Practice grounding exercises',
            'Limit caffeine intake',
        ],
        'angry': [
            'Take a 10-minute break',
            'Do some physical exercise',
            'Journal your feelings',
            'Try a cold shower or splashing cold water',
        ],
        'stressed': [
            'Practice meditation or yoga',
            'Break tasks into smaller chunks',
            'Take a power nap (15-20 minutes)',
            'Deep breathing exercises',
        ],
        'relaxed': [
            'Maintain this state with mindfulness',
            'Stay hydrated',
            'Continue with your current activities',
        ],
        'tired': [
            'Get 7-9 hours of sleeping tonight',
            'Take a quick power nap',
            'Drink water and eat healthy snacks',
        ],
        'energetic': [
            'Channel this into exercise',
            'Work on your goals',
            'Help someone in need',
        ],
        'neutral': [
            'Journal for clarity',
            'Try meditation',
            'Go for a walk',
        ],
    }
    
    @classmethod
    def generate(cls, text, emotion_analysis):
        """
        Generate AI response based on emotion analysis
        
        Args:
            text: User message
            emotion_analysis: Dict from EmotionAnalyzer.analyze()
        
        Returns:
            dict: Contains response and suggestions
        """
        # Get primary emotion or sentiment
        primary_emotion = emotion_analysis['emotions'][0]['emotion'] if emotion_analysis['emotions'] else emotion_analysis['sentiment']
        
        # Select response template
        templates = cls.RESPONSE_TEMPLATES.get(primary_emotion, cls.RESPONSE_TEMPLATES['neutral'])
        import random
        response = random.choice(templates)
        
        # Get suggestions
        suggestions = cls.SUGGESTIONS.get(primary_emotion, cls.SUGGESTIONS['neutral'])
        
        return {
            'response': response,
            'suggestions': suggestions[:3],  # Return top 3 suggestions
            'primary_emotion': primary_emotion,
        }


class RecommendationEngine:
    """
    Generates health recommendations based on mood and activity data
    """
    
    @classmethod
    def generate(cls, mood_score=None, sleep_hours=None, hydration_ml=None, exercise_minutes=None, stress_level=None):
        """
        Generate personalized health recommendations
        
        Returns:
            dict: Contains suggestions for improving health
        """
        suggestions = []
        
        # Sleep recommendations
        if sleep_hours is not None:
            if sleep_hours < 6:
                suggestions.append('Prioritize sleep - aim for 7-9 hours tonight. Space cardio/astronaut training for earlier in the day.')
            elif sleep_hours < 7:
                suggestions.append('Try to get 7-9 hours of sleep for optimal recovery and mood.')
        
        # Exercise recommendations
        if exercise_minutes is not None:
            if exercise_minutes < 30:
                suggestions.append('Try to exercise for at least 30 minutes today. A workout boosts mood and physical health.')
            elif exercise_minutes >= 30:
                suggestions.append('Great workout! Make sure to cool down and stretch properly.')
        
        # Hydration recommendations
        if hydration_ml is not None:
            if hydration_ml < 2000:
                suggestions.append('Increase water intake. Aim for 3-4 liters daily in spacecraft.')
            elif hydration_ml >= 3000:
                suggestions.append('Excellent hydration! Keep it up.')
        
        # Mood-based recommendations
        if mood_score is not None:
            if mood_score <= 3:
                suggestions.append('Your mood seems low. Try a 10-minute meditation or talk to a crewmate.')
            elif mood_score >= 8:
                suggestions.append('You\'re in great spirits! Channel this positive energy into your tasks.')
        
        # Stress recommendations
        if stress_level is not None:
            if stress_level >= 8:
                suggestions.append('High stress detected. Take a mindfulness break. Try the 4-7-8 breathing technique.')
            elif stress_level >= 5:
                suggestions.append('Consider a short relaxation activity to manage stress levels.')
        
        return {
            'suggestions': suggestions if suggestions else ['Keep maintaining your current healthy routines!'],
            'priority': 'high' if any(s in ' '.join(suggestions) for s in ['sleep', 'stress', 'exercise']) else 'medium',
        }
