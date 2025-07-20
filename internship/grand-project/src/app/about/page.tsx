/* eslint-disable react/no-unescaped-entities */
'use client';
import FloatingEmojis from '@/components/floatingEmojis';

export default function About() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-50 overflow-hidden flex items-center justify-center px-6 py-12">
      <FloatingEmojis />

      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl text-orange-800 z-10 hover:scale-105 transition-all">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-700 text-center">
          📚 About Recipe AI
        </h1>

        <p className="mb-4 text-lg">
          Welcome to <strong>AI Recipe Generator</strong> — your smart kitchen partner powered by advanced AI. We turn your food cravings, ingredients, or even a vague idea into fully detailed, delicious recipes — complete with cooking steps and images.
        </p>

        <p className="mb-4 text-lg">
          Whether you're a home cook, a student, a health-conscious foodie, or just someone tired of figuring out “what to cook?”, we’ve got you covered!
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-orange-600">🎯 Our Mission</h2>
        <p className="mb-4">
          To make cooking more enjoyable, accessible, and creative for everyone. With the help of AI, we bring inspiration into your kitchen without the stress of planning.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-orange-600">🚀 How It Works</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Describe your ingredients or cravings.</li>
          <li>Let our AI generate a personalized recipe.</li>
          <li>Get a beautiful dish image and cooking steps.</li>
          <li>Save your favorites with a simple click.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-orange-600">💡 Built for:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Busy professionals 🧑‍💼</li>
          <li>Curious food lovers 🍽️</li>
          <li>Beginner cooks 👩‍🍳</li>
          <li>People with dietary preferences 🌱</li>
        </ul>

        <p className="mt-6 text-center text-sm italic text-orange-700">
          Thank you for cooking with us! ✨ Let’s make your next meal unforgettable.
        </p>
      </div>
    </main>
  );
}
