import React, { useState } from 'react';
import { Author, Article } from '../types';
import { getAuthorProfile, saveAuthorProfile } from '../utils/storage';
import { User, Github, Twitter, Linkedin, Globe, Save, CheckCircle2, BookOpen, Clock, Award } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';

interface ProfilePageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onNavigate: (route: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  articles,
  onSelectArticle,
  onNavigate
}) => {
  const [profile, setProfile] = useState<Author>(getAuthorProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [bio, setBio] = useState(profile.bio);
  const [interestsStr, setInterestsStr] = useState(profile.interests.join(', '));
  const [github, setGithub] = useState(profile.github || '');
  const [twitter, setTwitter] = useState(profile.twitter || '');
  const [linkedin, setLinkedin] = useState(profile.linkedin || '');
  const [website, setWebsite] = useState(profile.website || '');

  const userArticles = articles.filter(
    (a) => a.author.name === profile.name || a.author.id === profile.id || a.isUserCreated
  );

  const totalWords = articles.reduce((acc, a) => acc + a.content.split(/\s+/).length, 0);

  const handleSave = () => {
    const updated: Author = {
      ...profile,
      name: name.trim() || 'Alex Vance',
      title: title.trim() || 'Software Engineer',
      bio: bio.trim(),
      interests: interestsStr.split(',').map(s => s.trim()).filter(Boolean),
      github: github.trim() || undefined,
      twitter: twitter.trim() || undefined,
      linkedin: linkedin.trim() || undefined,
      website: website.trim() || undefined
    };

    setProfile(updated);
    saveAuthorProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-[#f6f8fa] border-b border-[#d0d7de] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            
            {/* Avatar & Main Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1f2328]">
                    {profile.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] text-xs font-mono font-semibold">
                    Verified Author
                  </span>
                </div>
                <p className="text-sm font-medium text-[#57606a]">
                  {profile.title}
                </p>
                <p className="text-xs text-[#57606a] max-w-xl leading-relaxed">
                  {profile.bio}
                </p>

                {/* Social Links */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#57606a]">
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#0969da]">
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#0a66c2]">
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#0969da]">
                      <Twitter className="w-3.5 h-3.5" />
                      <span>X (Twitter)</span>
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#1a7f37]">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="shrink-0">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-colors shadow-xs"
              >
                {isEditing ? 'Cancel Editing' : 'Customize Profile'}
              </button>
            </div>

          </div>

          {/* Success Banner */}
          {savedSuccess && (
            <div className="mt-4 p-3 bg-[#dafbe1] text-[#1a7f37] border border-[#4ac26b]/40 rounded-lg text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Author profile saved successfully to local browser storage.</span>
            </div>
          )}

        </div>
      </div>

      {/* 2. Customization Edit Form (if toggled) */}
      {isEditing && (
        <section className="bg-white border-b border-[#d0d7de] py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h3 className="text-base font-bold text-[#1f2328] mb-4 font-mono uppercase tracking-wider text-xs">
              Edit Author Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#57606a] mb-1">Author Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#57606a] mb-1">Professional Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#57606a] mb-1">Short Biography</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#57606a] mb-1">Technical Interests (Comma Separated)</label>
                <input
                  type="text"
                  value={interestsStr}
                  onChange={(e) => setInterestsStr(e.target.value)}
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#57606a] mb-1">GitHub Profile URL</label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/your-handle"
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#57606a] mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/your-handle"
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#57606a] mb-1">Twitter / X Profile URL</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://twitter.com/your-handle"
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#57606a] mb-1">Personal Website / Portfolio</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className="w-full p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] text-[#1f2328] focus:bg-white focus:border-[#0969da]"
                />
              </div>

              <div className="sm:col-span-2 pt-2 flex justify-end">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#0969da] hover:bg-[#0550ae] text-white transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Author Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#57606a]">
              <BookOpen className="w-4 h-4 text-[#0969da]" />
              <span>Articles Authored</span>
            </div>
            <p className="text-2xl font-extrabold text-[#1f2328] mt-1 font-mono">
              {userArticles.length}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#57606a]">
              <Clock className="w-4 h-4 text-[#1a7f37]" />
              <span>Total Words Written</span>
            </div>
            <p className="text-2xl font-extrabold text-[#1f2328] mt-1 font-mono">
              {totalWords.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#57606a]">
              <Award className="w-4 h-4 text-[#8250df]" />
              <span>Test Pass Rate</span>
            </div>
            <p className="text-2xl font-extrabold text-[#1a7f37] mt-1 font-mono">
              100%
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#57606a]">
              <User className="w-4 h-4 text-[#bc4c00]" />
              <span>Project Series</span>
            </div>
            <p className="text-2xl font-extrabold text-[#1f2328] mt-1 font-mono">
              CAPSTONE 62
            </p>
          </div>
        </div>
      </div>

      {/* 4. Published Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#d0d7de] mb-6">
          <h2 className="text-xl font-bold text-[#1f2328] tracking-tight">
            Published Articles ({userArticles.length})
          </h2>
          <button
            onClick={() => onNavigate('write')}
            className="text-xs font-semibold text-[#0969da] hover:underline"
          >
            + Write a new article
          </button>
        </div>

        {userArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#57606a] border border-dashed rounded-lg">
            No published articles found under this author profile.
          </div>
        )}
      </section>

    </div>
  );
};
