import React from 'react';
import { Camera, Activity, Cpu, Leaf, Music, Heart, Feather, MapPin, BookOpen, Film, MessageCircle } from 'lucide-react';

const iconMap = {
    Camera: Camera,
    Activity: Activity,
    Cpu: Cpu,
    Leaf: Leaf,
    Music: Music,
    Heart: Heart,
    Feather: Feather,
    MapPin: MapPin,
    BookOpen: BookOpen,
    Film: Film,
    MessageCircle: MessageCircle,
};

const Wings = ({ wing }) => {
    const wingsArray = [
        { name: wing.wingsName1, details: wing.wingsDetails1 },
        { name: wing.wingsName2, details: wing.wingsDetails2 },
        { name: wing.wingsName3, details: wing.wingsDetails3 },
        { name: wing.wingsName4, details: wing.wingsDetails4 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {wingsArray.map((w, idx) => {
                const Icon = iconMap[wing.icon] || Camera;
                return (
                    <div
                        key={idx}
                        className="relative rounded-2xl shadow-lg overflow-hidden h-72 hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src="https://i.imgur.com/WW8YGRn.jpeg"
                            alt={w.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-between">
                            {/* Top row: Icon and specialty */}
                            <div className="flex items-center justify-between">
                                <Icon className="w-6 h-6 text-yellow-400" />
                                <span className="text-xs font-semibold text-white">{wing.specialty}</span>
                            </div>

                            {/* Middle: Name and details */}
                            <div>
                                <h3 className="text-2xl font-bold text-white">{w.name}</h3>
                                <p className="text-md text-gray-200 line-clamp-3">{w.details}</p>
                            </div>

                            {/* Bottom: Members, Manager, Contact */}
                            <div className="mt-2 text-xs text-gray-200 flex flex-col gap-1">
                                <span>Members: {wing.member}</span>
                                <span>Manager: {wing.managerName}</span>
                                <span>Contact: {wing.contact}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Wings;
