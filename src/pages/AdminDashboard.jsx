import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useFirestore from "../hooks/useFirestore";
import ImageUploader from "../components/ImageUploader";
import SectionEditor from "../components/SectionEditor";
import HeroSlideManager from "../components/admin/HeroSlideManager";
import { LogOut, LayoutDashboard, FileText, Plus, Settings, Trash2, Home, Users, Briefcase, Folder, MessageSquare, Building, Eye, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useSiteSettings } from "../context/SiteSettingsContext";

const PAGES = [
    { id: "home", name: "Home", icon: <Home size={20} /> },
    { id: "about", name: "About Us", icon: <Users size={20} /> },
    { id: "services", name: "Services", icon: <Briefcase size={20} /> },
    { id: "projects", name: "Projects", icon: <Folder size={20} /> },
    { id: "clients", name: "Clients", icon: <Building size={20} /> },
    { id: "contact", name: "Contact", icon: <MessageSquare size={20} /> },
    { id: "settings", name: "Site Settings", icon: <Settings size={20} /> },
];

const AdminDashboard = () => {
    const { logout, currentUser } = useAuth();
    const [activePage, setActivePage] = useState("home");
    const [activeTab, setActiveTab] = useState("hero");
    const { getDocument, updateDocument, getCollection, loading: firestoreLoading } = useFirestore("pages");
    const [pageData, setPageData] = useState({
        title: "",
        heroImages: [],
        heroText: "",
        sections: [],
        stats: [],
        features: [],
        teamMembers: [],
        clientLogos: [],
        projectCategories: []
    });
    const [initLoading, setInitLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        loadPageData(activePage);
        const firstTab = TABS[activePage]?.[0]?.id || "hero";
        setActiveTab(firstTab);
    }, [activePage]);

    const TABS = {
        home: [
            { id: "hero", label: "Hero Section", icon: <LayoutDashboard size={18} /> },
            { id: "stats", label: "Stats & Features", icon: <FileText size={18} /> },
            { id: "content", label: "Content Sections", icon: <FileText size={18} /> },
        ],
        about: [
            { id: "team", label: "Team Members", icon: <FileText size={18} /> },
            { id: "images", label: "Page Images", icon: <ImageIcon size={18} /> },
        ],
        services: [
            { id: "content", label: "Content Sections", icon: <FileText size={18} /> },
        ],
        projects: [
            { id: "categories", label: "Project Categories", icon: <FileText size={18} /> },
        ],
        clients: [
            { id: "logos", label: "Client Logos", icon: <FileText size={18} /> },
        ],
        contact: [
            { id: "messages", label: "Messages", icon: <FileText size={18} /> },
        ],
        settings: []
    };

    const moveItem = (key, index, direction) => {
        const list = [...(pageData[key] || [])];
        if (direction === 'up' && index > 0) {
            [list[index], list[index - 1]] = [list[index - 1], list[index]];
        } else if (direction === 'down' && index < list.length - 1) {
            [list[index], list[index + 1]] = [list[index + 1], list[index]];
        }
        setPageData({ ...pageData, [key]: list });
    };

    const loadPageData = async (pageId) => {
        setInitLoading(true);
        try {
            let collectionName = "pages";
            let docId = pageId;

            if (pageId === "settings") {
                collectionName = "settings";
                docId = "general";
            }

            const data = await getDocument(docId, collectionName);
            if (data) {
                setPageData(data);
            } else {
                const defaultState = {
                    title: "",
                    heroImages: [],
                    heroText: "",
                    sections: [],
                    stats: [],
                    features: [],
                    teamMembers: [],
                    clientLogos: [],
                    projectCategories: [],
                    email: "",
                    phone: "",
                    address: ""
                };

                if (pageId === "services") {
                    defaultState.title = "Our Services";
                    defaultState.heroText = "Leading the way in Electrical Infrastructure Development.";
                    defaultState.sections = [
                        { heading: "EHV Transmission Lines", content: "Turnkey & EPC of EHV Transmission Lines of all types, including Design, Supply, Civil, Erection, Testing & Commissioning of projects (up to 765 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=EHV+Transmission+Lines" },
                        { heading: "Sub-stations", content: "Turnkey EPC of all types of Sub-stations including Supply, Civil, Erection, Testing & Commissioning of projects (up to 765 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=Sub-stations" },
                        { heading: "Railway Traction Sub-Stations", content: "Turnkey EPC of Traction Sub Stations for Railways including Supply, Civil, Erection, Testing & Commissioning of projects (up to 25/220 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=Railway+Traction" },
                        { heading: "Rural Electrification", content: "Rural Electrification & Distribution Projects including infrastructure setup and grid connectivity.", image: "https://placehold.co/800x600/2563eb/FFF?text=Rural+Electrification" },
                        { heading: "Maintenance Services", content: "On Site Service Contracts like Live/Hot/Cold line maintenance of EHV Lines/Sub-stations.", image: "https://placehold.co/800x600/2563eb/FFF?text=Maintenance+Services" },
                        { heading: "Solar & Irrigation Projects", content: "Electrical Transmission & Sub – Station Projects of Lift Irrigation Schemes, Mega Scale Solar Power Plants.", image: "https://placehold.co/800x600/2563eb/FFF?text=Solar+%26+Irrigation" },
                        { heading: "Industrial Electrification", content: "Comprehensive Industrial Electrification Projects for factories and industrial zones.", image: "https://placehold.co/800x600/2563eb/FFF?text=Industrial+Electrification" },
                        { heading: "Line Upgradation", content: "Up gradation of EHV Lines to increase capacity and reliability.", image: "https://placehold.co/800x600/2563eb/FFF?text=Line+Upgradation" },
                        { heading: "Harmonic Analysis", content: "Detailed Harmonic Analysis to ensure power system health and efficiency.", image: "https://placehold.co/800x600/2563eb/FFF?text=Harmonic+Analysis" },
                        { heading: "Power Quality Audit", content: "Power Quality audit services to identify and resolve electrical issues.", image: "https://placehold.co/800x600/2563eb/FFF?text=Power+Quality+Audit" },
                        { heading: "Energy Saving Consultant", content: "Expert consultancy for energy saving and efficiency improvements.", image: "https://placehold.co/800x600/2563eb/FFF?text=Energy+Saving" }
                    ];
                }

                setPageData(defaultState);
            }

            if (pageId === "contact") {
                try {
                    const msgs = await getCollection("messages");
                    setMessages(msgs || []);
                } catch (msgErr) {
                    console.error("Error loading messages:", msgErr);
                    toast.error("Could not load messages. Check permissions.");
                    setMessages([]);
                }
            }

            if (pageId === "about") {
                const currentSections = data?.sections || [];
                const requiredHeadings = [
                    "About Sharvari Electricals",
                    "Our Infrastructure",
                    "Our Vision",
                    "Our Mission",
                    "Our Strength"
                ];

                const missingSections = [];
                if (!currentSections.find(s => s.heading.includes("About Sharvari"))) {
                    missingSections.push({
                        heading: "About Sharvari Electricals",
                        content: "Sharvari Electricals is a premier EPC company...",
                        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    });
                }
                if (!currentSections.find(s => s.heading.includes("Infrastructure"))) {
                    missingSections.push({
                        heading: "Our Infrastructure",
                        content: "We possess state-of-the-art infrastructure...",
                        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                    });
                }
                if (!currentSections.find(s => s.heading.includes("Vision"))) {
                    missingSections.push({ heading: "Our Vision", content: "To be the globally recognized leader..." });
                }
                if (!currentSections.find(s => s.heading.includes("Mission"))) {
                    missingSections.push({ heading: "Our Mission", content: "To deliver superior electrical infrastructure..." });
                }
                if (!currentSections.find(s => s.heading.includes("Strength"))) {
                    missingSections.push({ heading: "Our Strength", content: "Our core strengths lie in our experienced workforce..." });
                }

                if (missingSections.length > 0) {
                    setPageData(prev => ({ ...prev, sections: [...currentSections, ...missingSections] }));
                }
            }
        } catch (error) {
            console.error("Error loading page data:", error);
            toast.error("Failed to load page data.");
        } finally {
            setInitLoading(false);
        }
    };

    const handleSave = async () => {
        let collectionName = "pages";
        let docId = activePage;

        if (activePage === "settings") {
            collectionName = "settings";
            docId = "general";

            if (!pageData.email && !pageData.phone && !pageData.address) {
                toast.error("Please fill in at least one contact field.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (pageData.email && !emailRegex.test(pageData.email)) {
                toast.error("Please enter a valid email address.");
                return;
            }
        }

        const success = await updateDocument(docId, pageData, collectionName);
        if (success && activePage === "settings") {
            window.location.reload();
        }
    };

    const handleSectionChange = (index, newSection) => {
        const newSections = [...(pageData.sections || [])];
        newSections[index] = newSection;
        setPageData({ ...pageData, sections: newSections });
    };

    const handleDeleteSection = (index) => {
        if (window.confirm("Are you sure you want to delete this section?")) {
            const newSections = pageData.sections.filter((_, i) => i !== index);
            setPageData({ ...pageData, sections: newSections });
        }
    };

    const handleAddSection = () => {
        setPageData({
            ...pageData,
            sections: [...(pageData.sections || []), { heading: "New Section", content: "", image: "" }]
        });
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b flex items-center justify-center">
                    <img src="/src/assets/logo.png" alt="Sharvari Logo" className="h-12 object-contain" />
                </div>
                <div className="border-b px-6 py-2 text-center">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin Panel</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{currentUser?.email}</p>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {PAGES.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => setActivePage(page.id)}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${activePage === page.id
                                ? "bg-primary-50 text-primary-600"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span className="mr-3 text-current">{page.icon}</span>
                            {page.name}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Editing: {PAGES.find(p => p.id === activePage)?.name}</h1>
                        <button
                            onClick={handleSave}
                            disabled={firestoreLoading}
                            className="bg-primary-600 text-white px-6 py-2 rounded shadow hover:bg-primary-700 disabled:opacity-50"
                        >
                            {firestoreLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    {initLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-6 space-y-8">
                            {activePage === "settings" ? (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Global Contact Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-primary-500"
                                                value={pageData.email || ""}
                                                onChange={(e) => setPageData({ ...pageData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-primary-500"
                                                value={pageData.phone || ""}
                                                onChange={(e) => setPageData({ ...pageData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Address</label>
                                            <textarea
                                                rows={3}
                                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-primary-500"
                                                value={pageData.address || ""}
                                                onChange={(e) => setPageData({ ...pageData, address: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Tab Navigation */}
                                    <div className="flex border-b mb-6 overflow-x-auto">
                                        {TABS[activePage]?.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                                    ? "border-primary-600 text-primary-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                                    }`}
                                            >
                                                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Hero Section Edit */}
                                    {activeTab === "hero" && activePage === "home" && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Hero Carousel Settings</h3>
                                                {activePage !== "home" && (
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-5 w-5 text-primary-600 rounded focus:ring-primary-500"
                                                            checked={pageData.showHero !== false}
                                                            onChange={(e) => setPageData({ ...pageData, showHero: e.target.checked })}
                                                        />
                                                        <span className="text-sm font-medium text-gray-700">Show Hero Section</span>
                                                    </label>
                                                )}
                                            </div>

                                            {(activePage === "home" || pageData.showHero !== false) && (
                                                <HeroSlideManager 
                                                    pageData={pageData} 
                                                    setPageData={setPageData} 
                                                    activePage={activePage} 
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* Stats & Features Edit (Only for Home Page) */}
                                    {activeTab === "stats" && activePage === "home" && (
                                        <div className="space-y-8">
                                            {/* Stats */}
                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-800">Key Statistics</h3>
                                                    <button
                                                        onClick={() => {
                                                            setPageData({
                                                                ...pageData,
                                                                stats: [...(pageData.stats || []), { value: "100+", label: "Projects" }]
                                                            });
                                                        }}
                                                        className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                                                    >
                                                        <Plus size={16} className="mr-1" /> Add Stat
                                                    </button>
                                                </div>
                                                {pageData.stats && pageData.stats.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {pageData.stats.map((stat, index) => (
                                                            <div key={index} className="flex gap-2 items-center bg-gray-50 p-2 rounded border">
                                                                <div className="flex flex-col gap-1 mr-2">
                                                                    <button onClick={() => moveItem('stats', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-primary-600 disabled:opacity-30">▲</button>
                                                                    <button onClick={() => moveItem('stats', index, 'down')} disabled={index === pageData.stats.length - 1} className="text-gray-400 hover:text-primary-600 disabled:opacity-30">▼</button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Value (e.g. 10+)"
                                                                    className="w-1/3 px-2 py-1 border rounded text-sm"
                                                                    value={stat.value}
                                                                    onChange={(e) => {
                                                                        const newStats = [...pageData.stats];
                                                                        newStats[index].value = e.target.value;
                                                                        setPageData({ ...pageData, stats: newStats });
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Label (e.g. Years)"
                                                                    className="w-2/3 px-2 py-1 border rounded text-sm"
                                                                    value={stat.label}
                                                                    onChange={(e) => {
                                                                        const newStats = [...pageData.stats];
                                                                        newStats[index].label = e.target.value;
                                                                        setPageData({ ...pageData, stats: newStats });
                                                                    }}
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const newStats = pageData.stats.filter((_, i) => i !== index);
                                                                        setPageData({ ...pageData, stats: newStats });
                                                                    }}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 italic text-sm">No statistics added.</p>
                                                )}
                                            </div>
                                            {/* Features */}
                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-800">Key Features</h3>
                                                    <button
                                                        onClick={() => {
                                                            setPageData({
                                                                ...pageData,
                                                                features: [...(pageData.features || []), { title: "Feature", desc: "Description" }]
                                                            });
                                                        }}
                                                        className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                                                    >
                                                        <Plus size={16} className="mr-1" /> Add Feature
                                                    </button>
                                                </div>
                                                {pageData.features && pageData.features.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {pageData.features.map((feature, index) => (
                                                            <div key={index} className="flex items-start bg-gray-50 p-3 rounded border relative">
                                                                <div className="flex flex-col gap-1 mr-3 pt-1">
                                                                    <button onClick={() => moveItem('features', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-primary-600 disabled:opacity-30">▲</button>
                                                                    <button onClick={() => moveItem('features', index, 'down')} disabled={index === pageData.features.length - 1} className="text-gray-400 hover:text-primary-600 disabled:opacity-30">▼</button>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            const newFeatures = pageData.features.filter((_, i) => i !== index);
                                                                            setPageData({ ...pageData, features: newFeatures });
                                                                        }}
                                                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                    <div className="grid gap-2 pr-6">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Title"
                                                                            className="w-full px-2 py-1 border rounded text-sm font-medium"
                                                                            value={feature.title}
                                                                            onChange={(e) => {
                                                                                const newFeatures = [...pageData.features];
                                                                                newFeatures[index].title = e.target.value;
                                                                                setPageData({ ...pageData, features: newFeatures });
                                                                            }}
                                                                        />
                                                                        <textarea
                                                                            placeholder="Description"
                                                                            rows={2}
                                                                            className="w-full px-2 py-1 border rounded text-sm"
                                                                            value={feature.desc}
                                                                            onChange={(e) => {
                                                                                const newFeatures = [...pageData.features];
                                                                                newFeatures[index].desc = e.target.value;
                                                                                setPageData({ ...pageData, features: newFeatures });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 italic text-sm">No features added.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Sections Edit */}
                                    {activeTab === "content" && (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Content Sections</h3>
                                                {activePage !== "about" && (
                                                    <button
                                                        onClick={handleAddSection}
                                                        className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                                                    >
                                                        <Plus size={16} className="mr-1" /> Add Section
                                                    </button>
                                                )}
                                            </div>

                                            {pageData.sections && pageData.sections.length > 0 ? (
                                                <div className="space-y-6">
                                                    {pageData.sections.map((section, index) => (
                                                        <div key={index} className="flex gap-4 items-start">
                                                            <div className="flex flex-col gap-1 mt-4 sticky top-4">
                                                                <button onClick={() => moveItem('sections', index, 'up')} disabled={index === 0} className="p-1 bg-white border rounded shadow hover:bg-gray-50 text-gray-600 disabled:opacity-30">▲</button>
                                                                <button onClick={() => moveItem('sections', index, 'down')} disabled={index === pageData.sections.length - 1} className="p-1 bg-white border rounded shadow hover:bg-gray-50 text-gray-600 disabled:opacity-30">▼</button>
                                                            </div>
                                                            <div className="flex-1">
                                                                <SectionEditor
                                                                    index={index}
                                                                    section={section}
                                                                    folderPath={`uploads/${activePage}`}
                                                                    onChange={handleSectionChange}
                                                                    onDelete={handleDeleteSection}
                                                                    allowDelete={activePage !== "about"}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic text-center py-4">No content sections yet.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Messages View (Only for Contact Page) */}
                                    {activeTab === "messages" && activePage === "contact" && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Received Messages</h3>
                                                <button
                                                    onClick={() => loadPageData("contact")}
                                                    className="text-sm text-primary-600 hover:underline"
                                                >
                                                    Refresh
                                                </button>
                                            </div>

                                            {messages && messages.length > 0 ? (
                                                <div className="bg-white border rounded shadow overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender Details</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {messages.map((msg) => (
                                                                <tr key={msg.id} className="hover:bg-gray-50">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString() : "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        <div className="font-medium">{msg.name}</div>
                                                                        <div className="text-gray-500">{msg.email}</div>
                                                                        <div className="text-gray-500">{msg.mobile || "N/A"}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{msg.message}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <button
                                                                            onClick={() => setSelectedMessage(msg)}
                                                                            className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                                                                        >
                                                                            <Eye size={16} className="mr-1" /> View
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic text-center py-8 bg-gray-50 rounded-lg">No messages received yet.</p>
                                            )}

                                            {/* Message Detail Modal */}
                                            {selectedMessage && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                                        <div className="flex justify-between items-center p-6 border-b">
                                                            <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                                                            <button
                                                                onClick={() => setSelectedMessage(null)}
                                                                className="text-gray-400 hover:text-gray-500"
                                                            >
                                                                <X size={24} />
                                                            </button>
                                                        </div>
                                                        <div className="p-6 space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date & Time</label>
                                                                    <p className="text-sm text-gray-900">
                                                                        {selectedMessage.createdAt?.seconds
                                                                            ? new Date(selectedMessage.createdAt.seconds * 1000).toLocaleString()
                                                                            : "N/A"}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Sender Name</label>
                                                                    <p className="text-sm font-medium text-gray-900">{selectedMessage.name}</p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Sender Email</label>
                                                                    <a href={`mailto:${selectedMessage.email}`} className="text-sm text-primary-600 hover:underline">
                                                                        {selectedMessage.email}
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Mobile</label>
                                                                    <a href={`tel:${selectedMessage.mobile}`} className="text-sm text-primary-600 hover:underline">
                                                                        {selectedMessage.mobile || "N/A"}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Message Content</label>
                                                                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                                    {selectedMessage.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                                            <button
                                                                onClick={() => setSelectedMessage(null)}
                                                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Team Members Edit (Only for About Page) */}
                                    {activeTab === "team" && activePage === "about" && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Team Members</h3>
                                                <button
                                                    onClick={() => {
                                                        const newMembers = [...(pageData.teamMembers || []), { name: "New Member", role: "Role", image: "" }];
                                                        setPageData({ ...pageData, teamMembers: newMembers });
                                                    }}
                                                    className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                                                >
                                                    <Plus size={16} className="mr-1" /> Add Team Member
                                                </button>
                                            </div>

                                            {pageData.teamMembers && pageData.teamMembers.length > 0 ? (
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    {pageData.teamMembers.map((member, index) => (
                                                        <div key={index} className="border p-4 rounded-md bg-gray-50 relative">
                                                            <div className="absolute top-2 left-2 flex gap-1">
                                                                <button onClick={() => moveItem('teamMembers', index, 'up')} disabled={index === 0} className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30">▲</button>
                                                                <button onClick={() => moveItem('teamMembers', index, 'down')} disabled={index === pageData.teamMembers.length - 1} className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30">▼</button>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    const newMembers = pageData.teamMembers.filter((_, i) => i !== index);
                                                                    setPageData({ ...pageData, teamMembers: newMembers });
                                                                }}
                                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                                                title="Delete Member"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                            <h4 className="font-semibold mb-2 text-gray-700 text-sm">Member {index + 1}</h4>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full px-2 py-1 border rounded text-sm"
                                                                        value={member.name}
                                                                        onChange={(e) => {
                                                                            const newMembers = [...pageData.teamMembers];
                                                                            newMembers[index].name = e.target.value;
                                                                            setPageData({ ...pageData, teamMembers: newMembers });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700">Role</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full px-2 py-1 border rounded text-sm"
                                                                        value={member.role}
                                                                        onChange={(e) => {
                                                                            const newMembers = [...pageData.teamMembers];
                                                                            newMembers[index].role = e.target.value;
                                                                            setPageData({ ...pageData, teamMembers: newMembers });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Photo</label>
                                                                    <ImageUploader
                                                                        folderPath="uploads/team"
                                                                        currentImageUrl={member.image}
                                                                        onUploadComplete={(url) => {
                                                                            const newMembers = [...pageData.teamMembers];
                                                                            newMembers[index].image = url;
                                                                            setPageData({ ...pageData, teamMembers: newMembers });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700">Email (Optional)</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full px-2 py-1 border rounded text-sm"
                                                                        value={member.email || ""}
                                                                        onChange={(e) => {
                                                                            const newMembers = [...pageData.teamMembers];
                                                                            newMembers[index].email = e.target.value;
                                                                            setPageData({ ...pageData, teamMembers: newMembers });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700">Mobile (Optional)</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full px-2 py-1 border rounded text-sm"
                                                                        value={member.mobile || ""}
                                                                        onChange={(e) => {
                                                                            const newMembers = [...pageData.teamMembers];
                                                                            newMembers[index].mobile = e.target.value;
                                                                            setPageData({ ...pageData, teamMembers: newMembers });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic text-center py-4">No team members listed yet.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Page Images Edit (Only for About Page) */}
                                    {activeTab === "images" && activePage === "about" && (
                                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8">
                                            <div className="border-b pb-4">
                                                <h3 className="text-lg font-bold text-gray-800">Manage About Page Images</h3>
                                                <p className="text-sm text-gray-500">Upload and update images for the About Us page sections.</p>
                                            </div>

                                            {/* 1. Hero Section Image */}
                                            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                                <h4 className="font-semibold text-gray-700 mb-2">1. Hero Section - Background Image</h4>
                                                <p className="text-xs text-gray-500 mb-4">Displayed as the background for the Page Title (Hero) section.</p>
                                                <ImageUploader
                                                    folderPath="uploads/about"
                                                    currentImageUrl={pageData.heroImage}
                                                    onUploadComplete={(url) => setPageData({ ...pageData, heroImage: url })}
                                                />
                                            </div>

                                            {/* 2. About Section Image */}
                                            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                                <h4 className="font-semibold text-gray-700 mb-2">2. About Sharvari Electricals - Main Image</h4>
                                                <p className="text-xs text-gray-500 mb-4">Displayed in the "About Sharvari Electricals" section.</p>
                                                <ImageUploader
                                                    folderPath="uploads/about"
                                                    currentImageUrl={pageData.aboutImage}
                                                    onUploadComplete={(url) => setPageData({ ...pageData, aboutImage: url })}
                                                />
                                            </div>

                                            {/* 3. Infrastructure Images */}
                                            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                                <h4 className="font-semibold text-gray-700 mb-2">3. Our Infrastructure - Images</h4>
                                                <p className="text-xs text-gray-500 mb-4">Two images displayed in the "Our Infrastructure" section.</p>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Image 1 (Substation/Facility)</label>
                                                        <ImageUploader
                                                            folderPath="uploads/about"
                                                            currentImageUrl={pageData.infraImage1}
                                                            onUploadComplete={(url) => setPageData({ ...pageData, infraImage1: url })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Image 2 (Team/Work)</label>
                                                        <ImageUploader
                                                            folderPath="uploads/about"
                                                            currentImageUrl={pageData.infraImage2}
                                                            onUploadComplete={(url) => setPageData({ ...pageData, infraImage2: url })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Client Logos Edit (Only for Clients Page) */}
                                    {activeTab === "logos" && activePage === "clients" && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Client Logos</h3>
                                                <span className="text-sm text-gray-500">Upload logos to display in the grid</span>
                                            </div>

                                            <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 mb-6">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Logo</h4>
                                                <ImageUploader
                                                    folderPath="uploads/clients"
                                                    currentImageUrl={null}
                                                    multiple={true}
                                                    onUploadComplete={(urls) => {
                                                        const newLogos = [...(pageData.clientLogos || []), ...urls];
                                                        setPageData({ ...pageData, clientLogos: newLogos });
                                                    }}
                                                />
                                            </div>

                                            {pageData.clientLogos && pageData.clientLogos.length > 0 ? (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {pageData.clientLogos.map((logo, index) => (
                                                        <div key={index} className="relative group bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-32">
                                                            <div className="absolute top-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => moveItem('clientLogos', index, 'up')} disabled={index === 0} className="bg-white text-gray-500 hover:text-primary-600 p-1 rounded shadow text-xs disabled:opacity-30">▲</button>
                                                                <button onClick={() => moveItem('clientLogos', index, 'down')} disabled={index === pageData.clientLogos.length - 1} className="bg-white text-gray-500 hover:text-primary-600 p-1 rounded shadow text-xs disabled:opacity-30">▼</button>
                                                            </div>
                                                            <img src={logo} alt={`Client ${index}`} className="max-h-full max-w-full object-contain" />
                                                            <button
                                                                onClick={() => {
                                                                    const newLogos = pageData.clientLogos.filter((_, i) => i !== index);
                                                                    setPageData({ ...pageData, clientLogos: newLogos });
                                                                }}
                                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                                                                title="Delete Logo"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic text-center py-8 bg-gray-50 rounded-lg">No client logos uploaded yet.</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Project Categories Edit (Only for Projects Page) */}
                                    {activeTab === "categories" && activePage === "projects" && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800">Project Categories</h3>
                                                <button
                                                    onClick={() => {
                                                        setPageData({
                                                            ...pageData,
                                                            projectCategories: [
                                                                ...(pageData.projectCategories || []),
                                                                {
                                                                    id: Date.now().toString(),
                                                                    title: "New Category",
                                                                    columns: ["Client Name", "Location", "Status"],
                                                                    rows: []
                                                                }
                                                            ]
                                                        });
                                                    }}
                                                    className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                                                >
                                                    <Plus size={16} className="mr-1" /> Add Category
                                                </button>
                                            </div>

                                            {pageData.projectCategories && pageData.projectCategories.length > 0 ? (
                                                <div className="space-y-6">
                                                    {pageData.projectCategories.map((category, catIndex) => (
                                                        <div key={category.id || catIndex} className="bg-gray-50 border rounded-lg p-6 relative">
                                                            <div className="absolute top-4 left-4 flex gap-1">
                                                                <button onClick={() => moveItem('projectCategories', catIndex, 'up')} disabled={catIndex === 0} className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30">▲</button>
                                                                <button onClick={() => moveItem('projectCategories', catIndex, 'down')} disabled={catIndex === pageData.projectCategories.length - 1} className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30">▼</button>
                                                            </div>
                                                            <button onClick={() => {
                                                                if (window.confirm("Delete this category?")) {
                                                                    const newCats = pageData.projectCategories.filter((_, i) => i !== catIndex);
                                                                    setPageData({ ...pageData, projectCategories: newCats });
                                                                }
                                                            }}
                                                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                                                title="Delete Category"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>

                                                            <div className="mb-6">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full px-3 py-2 border rounded focus:ring-primary-500 font-semibold text-lg"
                                                                    value={category.title}
                                                                    onChange={(e) => {
                                                                        const newCats = [...pageData.projectCategories];
                                                                        newCats[catIndex].title = e.target.value;
                                                                        setPageData({ ...pageData, projectCategories: newCats });
                                                                    }}
                                                                />
                                                            </div>

                                                            {/* Columns Manager */}
                                                            <div className="mb-6">
                                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Table Columns (Comma separated)</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                                                                    value={category.columns.join(", ")}
                                                                    onChange={(e) => {
                                                                        const newCols = e.target.value.split(",").map(c => c.trim()).filter(c => c);
                                                                        const newCats = [...pageData.projectCategories];
                                                                        newCats[catIndex].columns = newCols;
                                                                        setPageData({ ...pageData, projectCategories: newCats });
                                                                    }}
                                                                    placeholder="e.g. Client Name, Location, Capacity, Status"
                                                                />
                                                            </div>

                                                            {/* Rows Manager */}
                                                            <div>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Data</label>
                                                                    <button
                                                                        onClick={() => {
                                                                            const newRow = {};
                                                                            category.columns.forEach(col => newRow[col] = "");
                                                                            const newCats = [...pageData.projectCategories];
                                                                            newCats[catIndex].rows.push(newRow);
                                                                            setPageData({ ...pageData, projectCategories: newCats });
                                                                        }}
                                                                        className="text-xs text-primary-600 font-medium hover:underline flex items-center"
                                                                    >
                                                                        <Plus size={12} className="mr-0.5" /> Add Row
                                                                    </button>
                                                                </div>

                                                                <div className="bg-white border rounded overflow-x-auto">
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-100">
                                                                            <tr>
                                                                                {category.columns.map((col, i) => (
                                                                                    <th key={i} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col}</th>
                                                                                ))}
                                                                                <th className="px-3 py-2 w-10"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-gray-200">
                                                                            {category.rows.map((row, rowIndex) => (
                                                                                <tr key={rowIndex}>
                                                                                    {category.columns.map((col, colIndex) => (
                                                                                        <td key={colIndex} className="px-3 py-2">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="w-full text-sm border-gray-100 focus:ring-0 focus:border-primary-500 rounded px-2 py-1"
                                                                                                value={row[col] || ""}
                                                                                                onChange={(e) => {
                                                                                                    const newCats = [...pageData.projectCategories];
                                                                                                    newCats[catIndex].rows[rowIndex][col] = e.target.value;
                                                                                                    setPageData({ ...pageData, projectCategories: newCats });
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                    ))}
                                                                                    <td className="px-3 py-2 text-right">
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                const newCats = [...pageData.projectCategories];
                                                                                                newCats[catIndex].rows = newCats[catIndex].rows.filter((_, rI) => rI !== rowIndex);
                                                                                                setPageData({ ...pageData, projectCategories: newCats });
                                                                                            }}
                                                                                            className="text-gray-400 hover:text-red-500"
                                                                                        >
                                                                                            <Trash2 size={14} />
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                    {category.rows.length === 0 && (
                                                                        <div className="text-center py-4 text-gray-400 text-sm italic">No data rows added yet.</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                    <p className="text-gray-500 text-lg mb-2">No project categories yet.</p>
                                                    <p className="text-gray-400 text-sm">Create a category like "Transmission Lines" to start adding data.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* SEO Settings (Common for all pages) */}
                                    {activeTab === "seo" && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">SEO Settings</h3>
                                                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Coming Soon</span>
                                            </div>
                                            <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                    <Settings className="text-gray-400" />
                                                </div>
                                                <h4 className="text-gray-900 font-medium">SEO Configuration</h4>
                                                <p className="text-gray-500 text-sm mt-1">Meta tags, Open Graph settings, and more will be available here soon.</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
