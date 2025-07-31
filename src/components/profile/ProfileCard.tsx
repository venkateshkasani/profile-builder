import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Globe, ExternalLink,X,Trash2,User,Briefcase,FileText,Check,Plus,Upload } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';

interface Profile {
  id: string;
  name: string;
  profession?: string;
  bio?: string;
  location?: string;
  website_url?: string;
  instagram_handle?: string;
  linkedin_url?: string;
  avatar_url?: string;
  is_verified: boolean;
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const [formData, setFormData] = useState({
    id: profile.id,
    name: profile.name,
    profession: profile.profession,
    bio: profile.bio,
    location: profile.location,
    website_url: profile.website_url,
    instagram_handle: profile.instagram_handle,
    linkedin_url: profile.linkedin_url,
    avatar_url: profile.avatar_url,
    is_verified: true
  });
  
  const [portfolioImages, setPortfolioImages] = useState([
    { id: '1', url: '', title: '', description: '' },
    { id: '2', url: '', title: '', description: '' },
    { id: '3', url: '', title: '', description: '' }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePortfolioChange = (id, field, value) => {
    setPortfolioImages(prev => 
      prev.map(img => 
        img.id === id ? { ...img, [field]: value } : img
      )
    );
  };

  const addPortfolioImage = () => {
    const newId = Date.now().toString();
    setPortfolioImages(prev => [...prev, { id: newId, url: '', title: '', description: '' }]);
  };

  const removePortfolioImage = (id) => {
    setPortfolioImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="text-lg">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{profile.name}</h3>
              {profile.is_verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            {profile.profession && (
              <p className="text-sm text-muted-foreground">{profile.profession}</p>
            )}
            {profile.location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{profile.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {profile.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {profile.bio}
          </p>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          {profile.website_url && (
            <Button variant="ghost" size="sm" asChild>
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
              </a>
            </Button>
          )}
          {profile.instagram_handle && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={`https://instagram.com/${profile.instagram_handle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Instagram className="h-4 w-4" /> */}
              </a>
            </Button>
          )}
          {profile.linkedin_url && (
            <Button variant="ghost" size="sm" asChild>
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                {/* <Linkedin className="h-4 w-4" /> */}
              </a>
            </Button>
          )}
        </div>
        <Dialog>
  <DialogTrigger>
  <Button 
          className="w-full"
          variant="outline"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Profile
  </Button>
  </DialogTrigger>
  <DialogContent>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <DialogHeader>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <DialogClose>
              <button
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
              </DialogClose>
            </div>
            </DialogHeader>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Briefcase size={16} />
                      Profession
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      placeholder="e.g., UI/UX Designer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} />
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      name="avatar_url"
                      value={formData.avatar_url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={16} />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Globe size={16} />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      {/* <Instagram size={16} /> */}
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      name="instagram_handle"
                      value={formData.instagram_handle}
                      onChange={handleInputChange}
                      placeholder="@username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      {/* <Linkedin size={16} /> */}
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_verified"
                    id="is_verified"
                    checked={formData.is_verified}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="is_verified" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Check size={16} className="text-green-500" />
                    Verified Profile
                  </label>
                </div>

                {/* Portfolio Section */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Portfolio Images</h3>
                    <button
                      type="button"
                      onClick={addPortfolioImage}
                      className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      <Plus size={16} />
                      Add Image
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioImages.map((image, index) => (
                      <div key={image.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-700">Image {index + 1}</h4>
                          {portfolioImages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePortfolioImage(image.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        {/* Image Preview Placeholder */}
                        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3 border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <Upload size={24} className="mx-auto mb-2" />
                            <p className="text-sm">Image Preview</p>
                            <p className="text-xs">Upload or paste URL</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <input
                            type="url"
                            placeholder="Image URL"
                            value={image.url}
                            onChange={(e) => handlePortfolioChange(image.id, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Image title"
                            value={image.title}
                            onChange={(e) => handlePortfolioChange(image.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          />
                          <textarea
                            placeholder="Image description"
                            value={image.description}
                            onChange={(e) => handlePortfolioChange(image.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Profile Data:', formData);
                      console.log('Portfolio Images:', portfolioImages);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  </DialogContent>
</Dialog>
      </CardContent>
    </Card>
  );
}