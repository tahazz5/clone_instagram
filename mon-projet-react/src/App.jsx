import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus, Home, Search, 
  Camera, User, Menu, Smile, Play, Volume2, VolumeX, ChevronLeft, ChevronRight,
  Settings, UserPlus, MapPin, Clock, Eye, EyeOff
} from 'lucide-react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: 'votre_nom',
    fullName: 'Votre Nom Complet',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    verified: false,
    followers: 1247,
    following: 892
  });
  const [activeTab, setActiveTab] = useState('home');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [storyIndex, setStoryIndex] = useState(0);
  const [viewingStory, setViewingStory] = useState(false);
  const [mutedVideos, setMutedVideos] = useState({});

  // Initialize realistic data
  useEffect(() => {
    const sampleStories = [
      { 
        id: 1, 
        username: 'votre_story', 
        avatar: currentUser.avatar, 
        isYour: true,
        hasNew: false,
        stories: [
          { id: 's1', type: 'image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop', timestamp: '2h' }
        ]
      },
      { 
        id: 2, 
        username: 'alex_photo', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        hasNew: true,
        stories: [
          { id: 's2', type: 'image', content: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop', timestamp: '4h' }
        ]
      },
      { 
        id: 3, 
        username: 'sarah_travels', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        hasNew: true,
        stories: [
          { id: 's3', type: 'image', content: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=700&fit=crop', timestamp: '6h' }
        ]
      },
      { 
        id: 4, 
        username: 'mike_fitness', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        hasNew: true,
        stories: [
          { id: 's4', type: 'image', content: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop', timestamp: '8h' }
        ]
      },
      { 
        id: 5, 
        username: 'emma_art', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        hasNew: false,
        stories: [
          { id: 's5', type: 'image', content: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=700&fit=crop', timestamp: '12h' }
        ]
      },
    ];

    const samplePosts = [
      {
        id: 1,
        username: 'alex_photo',
        fullName: 'Alexandre Martin',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Côte d\'Azur, France',
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop'
        ],
        caption: 'Coucher de soleil magique sur la Côte d\'Azur 🌅 Rien de tel qu\'une soirée comme celle-ci pour recharger les batteries ! #sunset #cotedazur #photography #france #goldenhour',
        likes: 2847,
        time: '2 heures',
        isLiked: false,
        isSaved: false,
        comments: [
          { username: 'sarah_travels', text: 'Magnifique ! 😍', time: '1h', likes: 12 },
          { username: 'mike_fitness', text: 'Incroyable cette lumière !', time: '45min', likes: 8 },
          { username: 'emma_art', text: 'Tu as utilisé quel objectif ?', time: '30min', likes: 3 }
        ],
        tags: ['sunset', 'cotedazur', 'photography', 'france', 'goldenhour']
      },
      {
        id: 2,
        username: 'sarah_travels',
        fullName: 'Sarah Dubois',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'Paris, France',
        images: [
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop'
        ],
        caption: 'Petit-déjeuner parisien parfait ☕️🥐 Il n\'y a rien de mieux qu\'un café et des croissants frais pour commencer la journée ! Cette petite boulangerie dans le 4ème arrondissement est un vrai trésor caché ✨ #paris #breakfast #croissant #coffee #france #foodie',
        likes: 1289,
        time: '5 heures',
        isLiked: true,
        isSaved: false,
        comments: [
          { username: 'alex_photo', text: 'Cette boulangerie a l\'air incroyable ! 🤤', time: '3h', likes: 24 },
          { username: 'foodie_paris', text: 'C\'est où exactement ? Je dois y aller !', time: '2h', likes: 15 },
          { username: 'emma_art', text: 'Tes photos food sont toujours parfaites', time: '1h', likes: 9 }
        ],
        tags: ['paris', 'breakfast', 'croissant', 'coffee', 'france', 'foodie']
      },
      {
        id: 3,
        username: 'mike_fitness',
        fullName: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Salle de Sport Lyon',
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop'
        ],
        caption: 'Séance de musculation terminée ! 💪 Aujourd\'hui c\'était jour de dos et biceps - 1h30 d\'entraînement intense. Remember : la régularité c\'est la clé du succès ! Qui est motivé pour s\'entraîner avec moi demain ? 🔥 #fitness #musculation #motivation #lifestyle #gym #lyon #training',
        likes: 892,
        time: '8 heures',
        isLiked: false,
        isSaved: true,
        comments: [
          { username: 'fitness_addict', text: 'Motivation au top ! 🔥', time: '6h', likes: 18 },
          { username: 'sarah_travels', text: 'Tu m\'inspires à reprendre le sport !', time: '4h', likes: 12 },
          { username: 'alex_photo', text: 'Quel programme tu suis ?', time: '2h', likes: 7 }
        ],
        tags: ['fitness', 'musculation', 'motivation', 'lifestyle', 'gym', 'lyon', 'training']
      },
      {
        id: 4,
        username: 'emma_art',
        fullName: 'Emma Rousseau',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Atelier Art Montmartre',
        images: [
          'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop'
        ],
        caption: 'Nouvelle toile terminée ! 🎨✨ J\'ai passé 3 semaines sur cette pièce inspirée des couchers de soleil sur la Seine. Les couleurs chaudes et les reflets sur l\'eau m\'ont toujours fascinée. Qu\'est-ce que vous en pensez ? Disponible dans ma galerie dès demain ! #art #painting #paris #seine #artwork #artist #montmartre #gallery',
        likes: 1847,
        time: '1 jour',
        isLiked: true,
        isSaved: false,
        comments: [
          { username: 'art_lover_paris', text: 'Absolument magnifique ! Les couleurs sont parfaites 😍', time: '20h', likes: 45 },
          { username: 'sarah_travels', text: 'Tu as un talent incroyable !', time: '18h', likes: 32 },
          { username: 'gallery_moderne', text: 'Nous aimerions exposer tes œuvres', time: '12h', likes: 28 },
          { username: 'mike_fitness', text: 'Art thérapie après le sport, ça détend !', time: '8h', likes: 15 }
        ],
        tags: ['art', 'painting', 'paris', 'seine', 'artwork', 'artist', 'montmartre', 'gallery']
      }
    ];

    setStories(sampleStories);
    setPosts(samplePosts);
  }, []);

  const toggleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const toggleSave = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const addComment = (postId) => {
    if (!newComment[postId]?.trim()) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [
                ...post.comments,
                {
                  username: currentUser.username,
                  text: newComment[postId],
                  time: 'maintenant',
                  likes: 0
                }
              ]
            }
          : post
      )
    );
    
    setNewComment(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const StoryItem = ({ story }) => (
    <div 
      className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer"
      onClick={() => !story.isYour && setViewingStory(story)}
    >
      <div className={`p-0.5 rounded-full ${
        story.isYour 
          ? 'bg-gray-300' 
          : story.hasNew 
            ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500' 
            : 'bg-gray-300'
      }`}>
        <div className="bg-white p-0.5 rounded-full">
          <img 
            src={story.avatar} 
            alt={story.username}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      {story.isYour && (
        <Plus className="absolute mt-8 ml-10 w-5 h-5 bg-blue-500 text-white rounded-full p-1" />
      )}
      <span className="text-xs text-gray-600 max-w-[60px] truncate">
        {story.isYour ? 'Votre story' : story.username}
      </span>
    </div>
  );

  const PostItem = ({ post }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img 
              src={post.avatar} 
              alt={post.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">{post.username}</span>
                {post.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              {post.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{post.location}</span>
                </div>
              )}
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>

        {/* Post Image(s) */}
        <div className="relative">
          <img 
            src={post.images[currentImageIndex]} 
            alt="Post"
            className="w-full h-96 object-cover"
            onDoubleClick={() => toggleLike(post.id)}
          />
          
          {/* Image Navigation */}
          {post.images.length > 1 && (
            <>
              {currentImageIndex > 0 && (
                <button 
                  onClick={() => setCurrentImageIndex(prev => prev - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {currentImageIndex < post.images.length - 1 && (
                <button 
                  onClick={() => setCurrentImageIndex(prev => prev + 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {post.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Heart 
                className={`w-7 h-7 cursor-pointer transition-all duration-200 ${
                  post.isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-900 hover:text-gray-600'
                }`}
                onClick={() => toggleLike(post.id)}
              />
              <MessageCircle 
                className="w-7 h-7 text-gray-900 cursor-pointer hover:text-gray-600" 
                onClick={() => toggleComments(post.id)}
              />
              <Send className="w-7 h-7 text-gray-900 cursor-pointer hover:text-gray-600 transform -rotate-12" />
            </div>
            <Bookmark 
              className={`w-7 h-7 cursor-pointer transition-colors ${
                post.isSaved ? 'fill-gray-900 text-gray-900' : 'text-gray-900 hover:text-gray-600'
              }`}
              onClick={() => toggleSave(post.id)}
            />
          </div>

          {/* Likes */}
          <div className="mb-3">
            <span className="font-semibold text-sm">{post.likes.toLocaleString()} j'aime</span>
          </div>

          {/* Caption */}
          <div className="mb-3">
            <span className="font-semibold text-sm mr-2">{post.username}</span>
            <span className="text-sm leading-relaxed">{post.caption}</span>
          </div>

          {/* View Comments */}
          {post.comments.length > 0 && !showComments[post.id] && (
            <button 
              onClick={() => toggleComments(post.id)}
              className="text-gray-500 text-sm mb-2 hover:text-gray-700"
            >
              Afficher les {post.comments.length} commentaires
            </button>
          )}

          {/* Comments Section */}
          {showComments[post.id] && (
            <div className="space-y-2 mb-3">
              {post.comments.map((comment, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="font-semibold text-sm">{comment.username}</span>
                  <span className="text-sm flex-1">{comment.text}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{comment.time}</span>
                    <Heart className="w-3 h-3 text-gray-400 cursor-pointer hover:text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
            <Smile className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            <input 
              type="text"
              placeholder="Ajouter un commentaire..."
              value={newComment[post.id] || ''}
              onChange={(e) => setNewComment(prev => ({
                ...prev,
                [post.id]: e.target.value
              }))}
              onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
              className="flex-1 text-sm border-none outline-none placeholder-gray-400"
            />
            {newComment[post.id]?.trim() && (
              <button 
                onClick={() => addComment(post.id)}
                className="text-blue-500 text-sm font-semibold hover:text-blue-700"
              >
                Publier
              </button>
            )}
          </div>

          {/* Time */}
          <div className="text-xs text-gray-400 uppercase mt-2 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Il y a {post.time}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 bg-clip-text text-transparent cursor-pointer">
              Instagram
            </h1>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Rechercher" 
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <Home className={`w-6 h-6 cursor-pointer ${activeTab === 'home' ? 'text-gray-900' : 'text-gray-400'}`} />
              <Send className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Plus className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Search className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 md:hidden" />
              <Heart className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username}
              className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-gray-200"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto flex">
        {/* Feed */}
        <div className="flex-1 max-w-lg mx-auto px-4">
          {/* Stories */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 my-6">
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {stories.map(story => (
                <StoryItem key={story.id} story={story} />
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="pb-20 md:pb-0">
            {posts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar - Desktop only */}
        <div className="hidden lg:block w-80 pl-8 py-6">
          <div className="sticky top-24">
            {/* User Profile */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-sm block">{currentUser.username}</span>
                  <span className="text-gray-500 text-sm">{currentUser.fullName}</span>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                Changer
              </button>
            </div>

            {/* User Stats */}
            <div className="flex justify-around mb-6 py-4 border-y border-gray-200">
              <div className="text-center">
                <span className="font-semibold text-sm block">{currentUser.followers.toLocaleString()}</span>
                <span className="text-gray-500 text-xs">abonnés</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-sm block">{currentUser.following.toLocaleString()}</span>
                <span className="text-gray-500 text-xs">abonnements</span>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-semibold text-sm">Suggestions pour vous</span>
                <span className="text-gray-900 text-xs font-semibold cursor-pointer hover:text-gray-600">Tout voir</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { 
                    username: 'julie_photographer', 
                    name: 'Julie Martin', 
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                    mutual: 'Suivi par alex_photo + 12 autres'
                  },
                  { 
                    username: 'tom_designer', 
                    name: 'Thomas Dupont', 
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    mutual: 'Suivi par sarah_travels + 8 autres'
                  },
                  { 
                    username: 'lisa_foodie', 
                    name: 'Lisa Chen', 
                    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
                    mutual: 'Nouveau sur Instagram'
                  }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user.avatar} 
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-sm font-semibold block">{user.username}</span>
                        <span className="text-xs text-gray-500">{user.mutual}</span>
                      </div>
                    </div>
                    <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
                      Suivre
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-xs text-gray-400 space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="cursor-pointer hover:text-gray-600">À propos</span>
                <span className="cursor-pointer hover:text-gray-600">Aide</span>
                <span className="cursor-pointer hover:text-gray-600">Presse</span>
                <span className="cursor-pointer hover:text-gray-600">API</span>
                <span className="cursor-pointer hover:text-gray-600">Emplois</span>
                <span className="cursor-pointer hover:text-gray-600">Confidentialité</span>
                <span className="cursor-pointer hover:text-gray-600">Conditions</span>
              </div>
              <div>
                <span>© 2025 Instagram Clone</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-3">
          <Home 
            className={`w-7 h-7 cursor-pointer ${activeTab === 'home' ? 'text-gray-900' : 'text-gray-400'}`}
            onClick={() => setActiveTab('home')}
          />
          <Search 
            className={`w-7 h-7 cursor-pointer ${activeTab === 'search' ? 'text-gray-900' : 'text-gray-400'}`}
            onClick={() => setActiveTab('search')}
          />
          <Plus 
            className={`w-7 h-7 cursor-pointer ${activeTab === 'create' ? 'text-gray-900' : 'text-gray-400'}`}
            onClick={() => setActiveTab('create')}
          />
          <Heart 
            className={`w-7 h-7 cursor-pointer ${activeTab === 'activity' ? 'text-gray-900' : 'text-gray-400'}`}
            onClick={() => setActiveTab('activity')}
          />
          <div 
            className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
              activeTab === 'profile' ? 'border-gray-900' : 'border-gray-400'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <img 
              src={currentUser.avatar} 
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Story Viewer Modal */}
      {viewingStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-sm h-full max-h-screen">
            {/* Story Header */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src={viewingStory.avatar} 
                  alt={viewingStory.username}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <span className="text-white font-semibold text-sm">{viewingStory.username}</span>
                <span className="text-white text-xs opacity-70">{viewingStory.stories[0].timestamp}</span>
              </div>
              <button 
                onClick={() => setViewingStory(false)}
                className="text-white text-2xl font-light hover:text-gray-300"
              >
                ×
              </button>
            </div>

            {/* Story Progress Bar */}
            <div className="absolute top-2 left-4 right-4 z-10">
              <div className="w-full bg-gray-600 bg-opacity-50 h-0.5 rounded-full">
                <div className="bg-white h-full rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Story Content */}
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={viewingStory.stories[0].content} 
                alt="Story"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Story Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
              <input 
                type="text"
                placeholder="Répondre à l'story..."
                className="flex-1 bg-transparent border border-white border-opacity-50 rounded-full px-4 py-2 text-white placeholder-gray-300 text-sm"
              />
              <Heart className="w-6 h-6 text-white cursor-pointer hover:text-red-400" />
              <Send className="w-6 h-6 text-white cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {activeTab === 'create' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
              <h3 className="font-semibold">Nouveau post</h3>
              <button className="text-blue-500 font-semibold hover:text-blue-700">
                Partager
              </button>
            </div>
            
            <div className="p-6 text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-2">Sélectionner des photos et vidéos</h4>
              <p className="text-gray-500 text-sm mb-6">Glissez vos photos et vidéos ici</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sélectionner depuis l'ordinateur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === 'activity' && (
        <div className="fixed inset-0 bg-white z-40 pt-16 pb-20 lg:hidden">
          <div className="px-4 py-6">
            <h2 className="text-xl font-semibold mb-6">Activité</h2>
            
            <div className="space-y-4">
              {/* Today */}
              <div>
                <h3 className="font-semibold text-sm text-gray-500 mb-3">Aujourd'hui</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                      alt="alex_photo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="text-sm">
                        <span className="font-semibold">alex_photo</span> a aimé votre photo.
                      </span>
                      <p className="text-xs text-gray-500">Il y a 2h</p>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop" 
                      alt="Post"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                      alt="sarah_travels"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="text-sm">
                        <span className="font-semibold">sarah_travels</span> a commencé à vous suivre.
                      </span>
                      <p className="text-xs text-gray-500">Il y a 5h</p>
                    </div>
                    <button className="bg-blue-500 text-white text-xs px-4 py-1 rounded hover:bg-blue-600">
                      Suivre
                    </button>
                  </div>
                </div>
              </div>

              {/* This Week */}
              <div>
                <h3 className="font-semibold text-sm text-gray-500 mb-3">Cette semaine</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="mike_fitness"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="text-sm">
                        <span className="font-semibold">mike_fitness</span> a commenté : "Superbe photo ! 📸"
                      </span>
                      <p className="text-xs text-gray-500">Il y a 2 jours</p>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop" 
                      alt="Post"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Tab Content */}
      {activeTab === 'search' && (
        <div className="fixed inset-0 bg-white z-40 pt-16 pb-20 lg:hidden">
          <div className="px-4 py-6">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-6">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Rechercher" 
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
            
            {/* Explore Grid */}
            <div className="grid grid-cols-3 gap-1">
              {[
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop'
              ].map((image, index) => (
                <div key={index} className="aspect-square relative">
                  <img 
                    src={image} 
                    alt={`Explore ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2 text-white">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-semibold">127</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <div className="fixed inset-0 bg-white z-40 pt-16 pb-20 lg:hidden overflow-y-auto">
          <div className="px-4 py-6">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{currentUser.username}</h2>
                  <p className="text-gray-600">{currentUser.fullName}</p>
                </div>
              </div>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
            </div>

            {/* Profile Stats */}
            <div className="flex justify-around mb-6 py-4 border-y border-gray-200">
              <div className="text-center">
                <span className="font-semibold text-lg block">124</span>
                <span className="text-gray-500 text-sm">publications</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg block">{currentUser.followers.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">abonnés</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg block">{currentUser.following.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">abonnements</span>
              </div>
            </div>

            {/* Profile Bio */}
            <div className="mb-6">
              <p className="text-sm leading-relaxed">
                📸 Passionné de photographie<br/>
                🌍 Voyageur dans l'âme<br/>
                ☕️ Amateur de café<br/>
                📍 Paris, France
              </p>
              <a href="#" className="text-blue-600 text-sm">www.monsite.com</a>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-6">
              <button className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm">
                Modifier le profil
              </button>
              <button className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm">
                Partager le profil
              </button>
              <button className="bg-gray-100 text-gray-900 py-2 px-3 rounded-lg">
                <UserPlus className="w-5 h-5" />
              </button>
            </div>

            {/* Highlights */}
            <div className="flex space-x-4 overflow-x-auto mb-6 pb-2">
              {[
                { name: 'Voyages', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop' },
                { name: 'Café', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop' },
                { name: 'Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop' }
              ].map((highlight, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 p-0.5">
                    <img 
                      src={highlight.image} 
                      alt={highlight.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600">{highlight.name}</span>
                </div>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-1">
              {posts.slice(0, 9).map((post, index) => (
                <div key={index} className="aspect-square relative">
                  <img 
                    src={post.images[0]} 
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {post.images.length > 1 && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-black bg-opacity-50 rounded p-1">
                        <span className="text-white text-xs">1/{post.images.length}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        <span className="text-sm font-semibold">{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;