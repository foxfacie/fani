"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquarePlus, Search, Smile, Image as ImageIcon, 
  Send, Phone, Video, MoreVertical, Check, 
  CheckCheck, ArrowLeft, Paperclip, Mic, X, Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  fadeIn, 
  slideInLeft, 
  slideInRight, 
  popUp 
} from "@/components/animation-variants";
import { cn } from "@/lib/utils";

// Define message type for type safety
interface Message {
  id: number;
  sender: "you" | "them";
  content: string;
  timestamp: Date;
  status: "sending" | "delivered" | "read";
  reactions: { emoji: string; user: string; }[];
}

// Define conversation type
interface Conversation {
  id: number;
  user: {
    name: string;
    avatar: string;
    online: boolean;
    lastActive: string;
    bio: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  typing: boolean;
}

const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: "Yuki Tanaka",
      avatar: "https://img.freepik.com/premium-psd/girl-hat-with-hood-it_854727-22197.jpg?semt=ais_hybrid&w=740",
      online: true,
      lastActive: "Just now",
      bio: "Anime enthusiast | Manga collector"
    },
    lastMessage: "Did you watch the latest episode? It was incredible! 🔥",
    timestamp: "2m ago",
    unread: 2,
    typing: true
  },
  {
    id: 2,
    user: {
      name: "Alex Chen",
      avatar: "https://static.vecteezy.com/system/resources/previews/011/484/425/non_2x/anime-boy-avatar-isolated-vector.jpg",
      online: true,
      lastActive: "5m ago",
      bio: "Gamer | RPG fan | PC enthusiast"
    },
    lastMessage: "Thanks for the game recommendation! I'm downloading it now.",
    timestamp: "1h ago",
    unread: 0,
    typing: false
  },
  {
    id: 3,
    user: {
      name: "Maria Garcia",
      avatar: "https://i.pinimg.com/736x/13/8c/93/138c93cd2cf946e4a58c04d77c347fb6.jpg",
      online: false,
      lastActive: "3h ago",
      bio: "Movie critic | Animation lover"
    },
    lastMessage: "Have you seen the new trailer for the upcoming anime season?",
    timestamp: "Yesterday",
    unread: 0,
    typing: false
  },
  {
    id: 4,
    user: {
      name: "James Wilson",
      avatar: "https://static.vecteezy.com/system/resources/previews/011/483/943/non_2x/anime-male-avatar-free-vector.jpg",
      online: false,
      lastActive: "Yesterday",
      bio: "Manga collector | Anime reviewer"
    },
    lastMessage: "Let me know when you're free to discuss the manga ending",
    timestamp: "2 days ago",
    unread: 0,
    typing: false
  },
  {
    id: 5,
    user: {
      name: "Emma Lee",
      avatar: "https://m.media-amazon.com/images/I/81Q5gCBUIhL.png",
      online: true,
      lastActive: "Just now",
      bio: "K-drama fan | Webtoon reader"
    },
    lastMessage: "I just started watching the show you recommended!",
    timestamp: "3 days ago",
    unread: 0,
    typing: false
  },
  {
    id: 6,
    user: {
      name: "David Kim",
      avatar: "https://ih1.redbubble.net/image.5398007347.4652/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      online: false,
      lastActive: "1 week ago",
      bio: "Fiction writer | Creative"
    },
    lastMessage: "What did you think about the latest episode?",
    timestamp: "5 days ago",
    unread: 0,
    typing: false
  }
];

const dummyMessages: Message[] = [
  {
    id: 1,
    sender: "you",
    content: "Hey Yuki! Have you been keeping up with the new season?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    status: "read",
    reactions: []
  },
  {
    id: 2,
    sender: "them",
    content: "Yes! I'm watching Attack on Titan Final Season and Demon Slayer!",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    status: "read",
    reactions: [{emoji: "❤️", user: "you"}]
  },
  {
    id: 3,
    sender: "you",
    content: "Same here. The animation quality is insane this season.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "read",
    reactions: []
  },
  {
    id: 4,
    sender: "them",
    content: "Absolutely! MAPPA and ufotable never disappoint.",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    status: "read",
    reactions: []
  },
  {
    id: 5,
    sender: "you",
    content: "What episode are you on in Demon Slayer?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    status: "read",
    reactions: []
  },
  {
    id: 6,
    sender: "them",
    content: "I just finished episode 5! The fight scenes are breathtaking!",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    status: "read",
    reactions: []
  },
  {
    id: 7,
    sender: "you",
    content: "I'm one episode behind you. No spoilers please! 😅",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "read",
    reactions: [{emoji: "😂", user: "them"}]
  },
  {
    id: 8,
    sender: "them",
    content: "Did you watch the latest episode? It was incredible! 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    status: "delivered",
    reactions: []
  }
];

// Fix the type for messagesByChat
const messagesByChat: Record<number, Message[]> = {
  1: dummyMessages,
  2: [
    {
      id: 1,
      sender: "you",
      content: "Hey Alex, have you tried that new game I recommended?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: "read",
      reactions: []
    },
    {
      id: 2,
      sender: "them",
      content: "Thanks for the game recommendation! I'm downloading it now.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: "delivered",
      reactions: [{emoji: "👍", user: "you"}]
    }
  ],
  3: [
    {
      id: 1,
      sender: "you",
      content: "Hi Maria, did you see that new trailer that just dropped?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      status: "read",
      reactions: []
    },
    {
      id: 2,
      sender: "them",
      content: "Have you seen the new trailer for the upcoming anime season?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "delivered",
      reactions: []
    }
  ],
  4: [
    {
      id: 1,
      sender: "them",
      content: "The manga ending was quite surprising, wasn't it?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      status: "read",
      reactions: []
    },
    {
      id: 2,
      sender: "you",
      content: "I'm still processing it honestly. Need to talk about it.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5),
      status: "read",
      reactions: []
    },
    {
      id: 3,
      sender: "them",
      content: "Let me know when you're free to discuss the manga ending",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      status: "delivered",
      reactions: []
    }
  ],
  5: [
    {
      id: 1,
      sender: "them",
      content: "I heard you're a fan of that show too!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      status: "read",
      reactions: []
    },
    {
      id: 2,
      sender: "you",
      content: "Yes! I highly recommend watching the second season.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5),
      status: "read",
      reactions: []
    },
    {
      id: 3,
      sender: "them",
      content: "I just started watching the show you recommended!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      status: "delivered",
      reactions: []
    }
  ],
  6: [
    {
      id: 1,
      sender: "you",
      content: "That twist in episode 7 was incredible!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      status: "read",
      reactions: []
    },
    {
      id: 2,
      sender: "them",
      content: "What did you think about the latest episode?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      status: "delivered",
      reactions: []
    }
  ]
};

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Conversation>(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(messagesByChat[1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isChangingChat, setIsChangingChat] = useState(false);
  
  // Filter conversations based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(
        convo => convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery]);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChatSelect = (chat: any) => {
    if (chat.id === selectedChat.id) return; // Don't do anything if clicking the same chat
    
    // Set transition state
    setIsChangingChat(true);
    
    // Load the messages first
    const chatMessages = messagesByChat[chat.id] || [];
    
    // Reset typing state for previous chat if it was typing
    if (selectedChat.typing) {
      const updatedChat = {...selectedChat, typing: false};
      // Find and update the old chat in filteredConversations
      const updatedConversations = filteredConversations.map(c => 
        c.id === updatedChat.id ? updatedChat : c
      );
      setFilteredConversations(updatedConversations);
    }
    
    // Update the selected chat in a single batch update
    setSelectedChat(chat);
    
    // Use a slight delay for setting messages to ensure smooth transition
    setTimeout(() => {
      setMessages(chatMessages);
      setIsChangingChat(false);
    }, 50);
    
    // Mark messages as read
    if (chat.unread > 0) {
      const updatedConversations = filteredConversations.map(c => 
        c.id === chat.id ? {...c, unread: 0} : c
      );
      setFilteredConversations(updatedConversations);
    }
    
    // Close mobile sidebar
    setShowMobileSidebar(false);
    
    // Cancel any attachment or emoji picker that might be open
    setAttachmentMenuOpen(false);
    setIsEmojiPickerOpen(false);
  };

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;
    
    // Add message to chat with proper typing
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "you",
      content: messageInput,
      timestamp: new Date(),
      status: "sending",
      reactions: []
    };
    
    // Update the messages state
    const updatedMessages: Message[] = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Also update the messagesByChat to persist messages between chat switches
    messagesByChat[selectedChat.id] = updatedMessages;
    
    setMessageInput("");
    
    // Simulate message being delivered
    setTimeout(() => {
      const deliveredMessage: Message = {...newMessage, status: "delivered"};
      const updatedDeliveredMessages = messages.map(msg => 
        msg.id === newMessage.id ? deliveredMessage : msg
      );
      
      if (selectedChat.id === updatedDeliveredMessages[0]?.id) {
        // Only update if we're still on the same chat
        setMessages([...updatedDeliveredMessages, deliveredMessage] as Message[]);
        // Update in the persistent store
        messagesByChat[selectedChat.id] = [...updatedDeliveredMessages, deliveredMessage] as Message[];
      }
    }, 1000);
    
    // Simulate typing indicator only for current chat
    setTimeout(() => {
      if (selectedChat.id === 1) { // Only Yuki replies automatically
        selectedChat.typing = true;
        setSelectedChat({...selectedChat});
        
        // Simulate reply only if we're still in the same chat
        setTimeout(() => {
          if (selectedChat.id === 1) {
            selectedChat.typing = false;
            setSelectedChat({...selectedChat});
            
            const reply: Message = {
              id: messagesByChat[selectedChat.id].length + 1,
              sender: "them",
              content: "Yes! The animation and fight choreography were amazing! Can't wait to discuss it when you watch it!",
              timestamp: new Date(),
              status: "delivered",
              reactions: []
            };
            
            const updatedWithReply: Message[] = [...messagesByChat[selectedChat.id], reply];
            setMessages(updatedWithReply);
            messagesByChat[selectedChat.id] = updatedWithReply;
          }
        }, 3000);
      }
    }, 2000);
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] m-4 rounded-xl border bg-card overflow-hidden shadow-2xl transition-all duration-300 bg-gradient-to-br from-violet-900/10 via-background to-indigo-900/5 font-sans antialiased">
      {/* Conversations List - Mobile View Toggle */}
      <AnimatePresence>
        {showMobileSidebar && (
          <motion.div 
            className="w-full md:w-80 border-r flex flex-col absolute md:relative z-10 bg-card h-full backdrop-blur-md bg-background/70 md:backdrop-blur-none md:bg-card border-r-violet-500/30"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="p-4 border-b backdrop-blur-md bg-background/30">
          <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">MESSAGES</h2>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10">
                        <Filter className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="backdrop-blur-md bg-background/80 border-primary/20 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2">
                      <DropdownMenuItem>All messages</DropdownMenuItem>
                      <DropdownMenuItem>Unread</DropdownMenuItem>
                      <DropdownMenuItem>Favorites</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10">
              <MessageSquarePlus className="w-5 h-5" />
            </Button>
                </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
                  className="pl-9 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
          </div>
        </div>
            
            <Tabs 
              defaultValue="all" 
              className="px-4 pt-4"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full bg-background/40 backdrop-blur-sm rounded-xl">
                <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full font-bold">ALL</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full font-bold">UNREAD</TabsTrigger>
                <TabsTrigger value="groups" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full font-bold">GROUPS</TabsTrigger>
              </TabsList>
            </Tabs>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No conversations found
                  </div>
                ) : (
                  filteredConversations
                    .filter(chat => 
                      activeTab === "all" || 
                      (activeTab === "unread" && chat.unread > 0) ||
                      (activeTab === "groups" && chat.id % 2 === 0) // Just a demo filter for groups
                    )
                    .map((chat) => (
                    <motion.button
                key={chat.id}
                      onClick={() => handleChatSelect(chat)}
                      className={cn(
                        "w-full p-3 rounded-xl transition-colors mt-2 backdrop-blur-sm",
                  selectedChat.id === chat.id
                          ? "bg-primary/10 shadow-md border-2 border-primary/30"
                          : "hover:bg-muted/30 border-2 border-transparent",
                        chat.unread > 0 && "bg-primary/5"
                      )}
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                          <Avatar className={cn(
                            "w-12 h-12 ring-2 ring-offset-2 transition-all",
                            chat.user.online 
                              ? "ring-green-500/50 ring-offset-background" 
                              : "ring-transparent ring-offset-transparent",
                            selectedChat.id === chat.id && "ring-primary/50"
                          )}>
                      <img src={chat.user.avatar} alt={chat.user.name} />
                    </Avatar>
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                            <span className={cn(
                              "font-bold text-base",
                              chat.unread > 0 ? 'text-primary' : '',
                              selectedChat.id === chat.id && "text-primary"
                            )}>
                              {chat.user.name.toUpperCase()}
                            </span>
                            <span className={`text-xs ${chat.unread > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {chat.timestamp}
                      </span>
                    </div>
                          <div className="flex items-center">
                            {chat.typing ? (
                              <span className="text-sm text-primary font-medium">
                                typing...
                              </span>
                            ) : (
                              <p className={`text-sm truncate ${chat.unread > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {chat.lastMessage}
                    </p>
                            )}
                          </div>
                  </div>
                  {chat.unread > 0 && (
                          <Badge variant="default" className="rounded-full animate-pulse">
                      {chat.unread}
                          </Badge>
                  )}
                </div>
                    </motion.button>
                  ))
                )}
          </div>
        </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.2 }}
        key="chat-container"
      >
        <div className="p-3 border-b flex items-center justify-between backdrop-blur-md bg-background/30 border-b-violet-500/30">
          <div className="flex items-center space-x-3">
            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden rounded-full hover:bg-primary/10"
              onClick={() => setShowMobileSidebar(true)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10 ring-2 ring-offset-1 ring-offset-background ring-primary/20">
            <img src={selectedChat.user.avatar} alt={selectedChat.user.name} />
          </Avatar>
          <div>
              <h3 className="font-bold text-base text-primary">{selectedChat.user.name.toUpperCase()}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedChat.user.online ? (
                  <span className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                    Online
                  </span>
                ) : (
                  `Last active: ${selectedChat.user.lastActive}`
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="hidden md:flex rounded-full hover:bg-primary/10">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="hidden md:flex rounded-full hover:bg-primary/10">
              <Video className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="backdrop-blur-md bg-background/80 border-primary/20 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-violet-50/5 via-background to-indigo-50/5 dark:from-violet-950/5 dark:to-indigo-950/5">
          <div className={cn("space-y-4 min-h-[300px]", isChangingChat && "opacity-50 transition-opacity duration-200")}>
            <div className="text-center my-2">
              <span className="text-xs font-bold text-muted-foreground bg-background/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                TODAY
              </span>
            </div>
            
            <AnimatePresence mode="wait" initial={false}>
              <div key={selectedChat.id} className="messages-container">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={message.id} className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"} mb-4`}>
                      <motion.div 
                        className={cn(
                          "max-w-[80%] p-3 relative group",
                          message.sender === "you" 
                            ? "rounded-l-xl rounded-br-xl shadow-md" 
                            : "rounded-r-xl rounded-bl-xl shadow-md",
                          message.sender === "you" && "bg-primary text-primary-foreground border-primary/70",
                          message.sender === "them" && "bg-muted/70 backdrop-blur-sm border border-muted-foreground/10"
                        )}
                        variants={message.sender === "you" ? slideInRight : slideInLeft}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.05 * Math.min(index, 3) }}
                      >
                        <p className="text-sm font-medium">{message.content}</p>
                        <div className={`flex items-center text-xs mt-1 ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
                          <span className={message.sender === "you" ? "text-white/70" : "text-muted-foreground"}>
                            {formatMessageTime(message.timestamp)}
                          </span>
                          
                          {message.sender === "you" && (
                            <span className="ml-1 text-white/70">
                              {message.status === "sending" && "•"}
                              {message.status === "delivered" && <Check className="w-3 h-3 inline" />}
                              {message.status === "read" && <CheckCheck className="w-3 h-3 inline" />}
                            </span>
                          )}
                        </div>
                        
                        {message.reactions.length > 0 && (
                          <div className={cn(
                            "absolute -bottom-2 bg-background/90 backdrop-blur-md border rounded-full py-0.5 px-1 flex items-center shadow-md",
                            message.sender === "you" ? "left-0 -translate-x-[50%]" : "right-0 translate-x-[50%]"
                          )}>
                            {message.reactions.map((reaction, i) => (
                              <span key={i} className="text-xs animate-pulse">{reaction.emoji}</span>
                            ))}
                          </div>
                        )}
                        
                        <div className={cn(
                          "absolute opacity-0 group-hover:opacity-100 transition-opacity flex-col",
                          message.sender === "you" ? "-left-8" : "-right-8",
                          "top-0"
                        )}>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
                          >
                            <Smile className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  ))
                ) : (
                  <motion.div 
                    className="flex items-center justify-center h-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground text-sm">No messages yet. Start a conversation!</p>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
            
            {selectedChat.typing && (
              <div className="flex justify-start">
                <motion.div 
                  className="bg-muted/70 backdrop-blur-sm border border-muted-foreground/10 rounded-r-xl rounded-bl-xl p-2 shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex space-x-1 items-center px-1">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </motion.div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t backdrop-blur-md bg-background/30 border-t-violet-500/30">
          <div className="relative">
            {attachmentMenuOpen && (
              <motion.div 
                className="absolute -top-28 left-0 flex space-x-2"
                variants={popUp}
                initial="hidden"
                animate="visible"
              >
                <Button size="icon" variant="outline" className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 border-primary/20">
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 border-primary/20">
                  <Paperclip className="w-5 h-5 text-green-500" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 border-primary/20">
                  <Mic className="w-5 h-5 text-red-500" />
                </Button>
              </motion.div>
            )}
            
          <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                className={cn(
                  "rounded-full hover:bg-primary/10",
                  attachmentMenuOpen && "bg-primary/10 text-primary"
                )}
              >
                <Paperclip className="w-5 h-5" />
            </Button>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className={cn(
                  "rounded-full hover:bg-primary/10",
                  isEmojiPickerOpen && "bg-primary/10 text-primary"
                )}
              >
              <Smile className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleMessageSend();
                  }
                }}
                className="flex-1 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  size="icon" 
                  variant="default"
                  onClick={handleMessageSend}
                  disabled={messageInput.trim() === ""}
                  className="rounded-full shadow-md"
                >
              <Send className="w-5 h-5" />
            </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}