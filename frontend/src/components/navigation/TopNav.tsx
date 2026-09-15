import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { navTabs } from '../../data';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="w-full h-12 shrink-0 flex items-center justify-between px-5 bg-[#0A0A0B] select-none z-40 border-b border-[rgba(255,255,255,0.04)]">
      {/* Left: Logo & Navigation items */}
      <div className="flex items-center space-x-7">
        {/* Abstract 4-Bar Slanted Ribbon Logo Mark */}
        <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity" title="Traffic Management NOC">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="18" x2="16" y2="6" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="7" y1="20" x2="19" y2="8" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="4" y1="14" x2="14" y2="4" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="5" y1="10" x2="11" y2="4" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-6 text-[13px]">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`transition-all duration-150 ${
                  isActive
                    ? 'px-4 py-1.5 rounded-full bg-[#2A2A2E] text-[#F5F5F4] font-medium shadow-sm'
                    : 'text-[#9A9A9E] hover:text-[#F5F5F4] font-normal'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Cluster: Search, Notifications, Messages, User Profile */}
      <div className="flex items-center space-x-3.5">
        {/* Search Pill */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Ctrl+Shift+F"
            className="w-52 xl:w-60 h-7 pl-3.5 pr-8 bg-[#1F1F22] rounded-full text-[11.5px] text-[#F5F5F4] placeholder-[#5C5C60] focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
          <Search className="absolute right-3 w-3.5 h-3.5 text-[#9A9A9E] pointer-events-none stroke-[1.8]" />
        </div>

        {/* Bell Button */}
        <button
          type="button"
          className="p-1.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors rounded-full hover:bg-[#1F1F22]"
          title="Notifications"
        >
          <Bell className="w-4 h-4 stroke-[1.6]" />
        </button>

        {/* Message Bubble with Red Badge 3 */}
        <button
          type="button"
          className="relative p-1.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors rounded-full hover:bg-[#1F1F22]"
          title="Messages"
        >
          <MessageSquare className="w-4 h-4 stroke-[1.6]" />
          <span className="absolute top-0 right-0 bg-[#E5484D] text-white text-[8.5px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
            3
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="w-7 h-7 rounded-full overflow-hidden border border-white/15 cursor-pointer ml-1">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
            alt="Dispatcher Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
