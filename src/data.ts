/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, BlogArticle, FaqItem } from './types';
import redditProductIcon from './assets/images/reddit_product_icon_1780251390780.png';

const initialProducts: Product[] = [
  {
    id: "prod-1",
    wpId: "2763",
    title: "10 Normal Posts in Small Subreddits Instant Delivery with Guarantee!",
    category: "reddit-posts",
    originalPrice: 125.00,
    salePrice: 75.00,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200",
    description: "Post your contents securely inside small targeted subreddits. Helps you bypass automatic spam filters and gain organic attention. Full refund guaranteed if not satisfied.",
    link: "https://karmawhores.com/product/10-normal-posts-in-small-subreddits-instant-delivery-with-guarantee/",
    tags: ["reddit-posts", "posts", "guaranteed"]
  },
  {
    id: "prod-2",
    wpId: "2652",
    title: "45% OFF Reddit Account - Post Karma 2,483 - Age 5 years old. Limited Time Offer!!!",
    category: "reddit-accounts",
    originalPrice: 95.00,
    salePrice: 60.00,
    age: "5 years",
    postKarma: 2483,
    commentKarma: 0,
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=200",
    description: "A highly trusted Reddit account, aged over 5 years. Standard posting reputation, completely ban-free, ready to seed content across premium subreddits instantly.",
    link: "https://karmawhores.com/product/45-off-reddit-account-post-karma-2483-age-5-years-old-limited-time-offer/",
    tags: ["5-years", "high-karma", "discount"]
  },
  {
    id: "prod-3",
    wpId: "2994",
    title: "5 years Aged Best Reddit Account 2315 Post Karma 74 Comment Karma",
    category: "reddit-accounts",
    originalPrice: 85.00,
    salePrice: 55.00,
    age: "5 years",
    postKarma: 2315,
    commentKarma: 74,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=200",
    description: "Perfect account for crypto, software, or lifestyle niches. Excellent trust levels with post karma of 2315 and comment karma of 74. Safe and ban-free.",
    link: "https://karmawhores.com/product/5-years-aged-best-reddit-account-2315-post-karma-74-comment-karma-rahat/",
    tags: ["5-years", "aged-account", "rahat"]
  },
  {
    id: "prod-4",
    wpId: "270",
    title: "50% off / Reddit Account Age 8 years club Post Karma 4279 Comment Karma 612",
    category: "reddit-accounts",
    originalPrice: 175.00,
    salePrice: 120.00,
    age: "8 years",
    postKarma: 4279,
    commentKarma: 612,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200",
    description: "Premium aged Reddit account belonging to the elite 8 Years Club. Includes outstanding 4279 post karma and 612 comment karma. Absolute authority for high-tier marketing campaigns.",
    link: "https://karmawhores.com/product/reddit-account-age11-months-old-post-karma-2236-comment-karma-568/",
    tags: ["8-years-club", "elder-account", "half-price"]
  },
  {
    id: "prod-5",
    wpId: "75",
    title: "7x Reddit Accounts Age over 6 months with karma 10 above",
    category: "reddit-accounts",
    originalPrice: 120.50,
    salePrice: 95.50,
    age: "6+ months",
    postKarma: 10,
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27f?auto=format&fit=crop&q=80&w=200",
    description: "A solid starter bundle of 7 independent Reddit accounts, all older than 6 months with a basic baseline karma of 10+. Excellent for distributed upvoting or multiple concurrent posting tasks.",
    link: "https://karmawhores.com/product/reddit-account-for-sale-3600-post-karma-88-comment-karma/",
    tags: ["bulk-bundle", "starter-kit", "multi-accounts"]
  },
  {
    id: "prod-6",
    wpId: "2995",
    title: "8 years aged account post karma 2441 Comment karma 390",
    category: "reddit-accounts",
    originalPrice: 150.00,
    salePrice: 120.00,
    age: "8 years",
    postKarma: 2441,
    commentKarma: 390,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200",
    description: "A highly resilient 8-year aged account. With a beautiful balanced ratio of 2441 post karma and 390 comment karma, this account is a perfect digital asset for reliable promotions.",
    link: "https://karmawhores.com/product/8-years-aged-account-post-karma-2441-comment-karma-390-rahat/",
    tags: ["8-years", "reliable-reputation"]
  },
  {
    id: "prod-7",
    wpId: "61",
    title: "Best Price Reddit account age 1 years old Post karma 6000 Comment karma 106",
    category: "reddit-accounts",
    originalPrice: 100.00,
    salePrice: 85.00,
    age: "1 year",
    postKarma: 6000,
    commentKarma: 106,
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bda9f2?auto=format&fit=crop&q=80&w=200",
    description: "Top value listing. 1-year aged account boasting an awesome 6,000 post karma and 106 comment karma. Easily satisfies strict submission requirements of major communities.",
    link: "https://karmawhores.com/product/6000-reddit-account-for-sale/",
    tags: ["best-value", "high-post-karma", "1-year"]
  },
  {
    id: "prod-8",
    wpId: "327",
    title: "Blank Reddit Accounts for Sale 10 in bulk! Age from 6 months to 2 years",
    category: "reddit-accounts",
    originalPrice: 200.50,
    salePrice: 150.50,
    age: "6 - 24 months",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
    description: "Package of 10 clean, unblemished blank Reddit accounts. Ages ranging from 6 months to 2 years old. Ideal choice for professional marketers requiring reliable stock for scaling up.",
    link: "https://karmawhores.com/product/reddit-account-age5-years-post-karma-1216-comment-karma-373/",
    tags: ["bulk", "blank-accounts", "unbranded"]
  },
  {
    id: "prod-9",
    wpId: "283",
    title: "Blank Reddit Accounts for sale from age 1 year old to 3 years old+",
    category: "reddit-accounts",
    originalPrice: 17.99,
    salePrice: 15.99,
    age: "1 - 3 years",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200",
    description: "Single purchase premium empty accounts with clear history. Aged from 1 to 3+ years. Start with a solid trust badge and zero post baggage.",
    link: "https://karmawhores.com/product/reddit-account-age2-years-old-post-karma-7427-comment-karma-170/",
    tags: ["budget-friendly", "aged", "clean-slate"]
  },
  {
    id: "prod-10",
    wpId: "89",
    title: "Bulk Buy High Karma 5x Reddit accounts Age 1 year club post karma 4000* comment karma 2000+",
    category: "reddit-accounts",
    originalPrice: 585.00,
    salePrice: 450.00,
    age: "1 year",
    postKarma: 4000,
    commentKarma: 2000,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=200",
    description: "This wholesale listing delivers 5 Reddit accounts, each belonging to the 1 Year Club. Featuring high authority levels with ~4000 post karma and ~2000+ comment karma per account.",
    link: "https://karmawhores.com/product/reddit-account-for-sale-2100-post-karma-24-comment-karma/",
    tags: ["bulk", "high-karma", "elite-pack"]
  },
  {
    id: "prod-11",
    wpId: "236",
    title: "Bulk buy Reddit Accounts Bundle 7 months old x 5 Reddit accounts, see below chart for karma",
    category: "reddit-accounts",
    originalPrice: 99.00,
    salePrice: 79.00,
    age: "7 months",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200",
    description: "Get 5 verified accounts aged exactly 7 months. Tailored for team configurations and reliable upvoting distribution. Safe, fully ready, and instant delivery.",
    link: "https://karmawhores.com/product/reddit-account-age-6-years-old-post-karma-3928-comment-karma-65/",
    tags: ["group-bundle", "7-months", "verified"]
  },
  {
    id: "prod-12",
    wpId: "235",
    title: "Bulk Buy: 16x Reddit accounts 6 months old see below chart for post and comment karma",
    category: "reddit-accounts",
    originalPrice: 350.00,
    salePrice: 250.00,
    age: "6 months",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200",
    isOutOfStock: true,
    description: "Massive corporate outreach array of 16 individual multi-niche accounts. All with 6 months age limit. Currently out of stock due to massive demand.",
    link: "https://karmawhores.com/product/reddit-account-age-6-years-old-post-karma-2000-comment-karma-219/",
    tags: ["wholesale", "out-of-stock", "marketing-grid"]
  },
  {
    id: "prod-13-service",
    wpId: "2758",
    title: "Buy Reddit Comments",
    category: "reddit-comments",
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=200",
    isCustomService: true,
    description: "Improve post-level engagement and steer conversations. Get customized comments from real, high-quality Reddit users matching your brand's unique style.",
    link: "https://karmawhores.com/product/post-reddit-comments/",
    tags: ["engagement", "comments-boost", "recommended"]
  },
  {
    id: "prod-14-service",
    wpId: "2757",
    title: "Buy Reddit Posting Service",
    category: "reddit-posts",
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200",
    isCustomService: true,
    description: "Let our experienced copywriting team craft and successfully publish target posts on your niche subreddits. Backed by fully warmed-up aged accounts and strict anti-ban compliance.",
    link: "https://karmawhores.com/product/buy-reddit-posting-service/",
    tags: ["done-for-you", "premium-service", "writing"]
  },
  {
    id: "prod-15",
    wpId: "335",
    title: "CMS Friendly Reddit Account Age 5-9 years old Karma over 2000",
    category: "reddit-accounts",
    originalPrice: 150.00,
    salePrice: 100.00,
    age: "5 - 9 years",
    postKarma: 2000,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=200",
    description: "Expertly tuned for strict Content Management Systems (CMS) and demanding algorithms. Age profile ranges from 5 to 9 years old. Supercharged and guaranteed.",
    link: "https://karmawhores.com/product/reddit-account-age4-years-old-post-karma-1-comment-karma-776/",
    tags: ["cms-compliant", "expert", "aged-badge"]
  },
  {
    id: "prod-16",
    wpId: "83",
    title: "coinhunt.cc up votes available",
    category: "reddit-posts",
    originalPrice: 8000.00,
    salePrice: 5000.00,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200",
    description: "Specialized service providing stable upvotes for crypto tokens listed on coinhunt.cc. Gain organic trending status and boost your token launch effortlessly.",
    link: "https://karmawhores.com/product/reddit-account-for-sale-3600-post-karma-1168-comment-karma/",
    tags: ["crypto-trending", "coinhunt", "whale-pack"]
  },
  {
    id: "prod-17",
    wpId: "2440",
    title: "Comprehensive Reddit Beginner's Guide by KarmaWhores",
    category: "guides",
    originalPrice: 15.00,
    salePrice: 5.99,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=200",
    description: "Unlock all secrets of Reddit. Learn how to format post payloads, steer target subreddits, avoid shadowbans, bypass spam bots, and execute high-growth marketing strategies.",
    link: "https://karmawhores.com/product/comprehensive-reddit-beginners-guide-by-karmawhores/",
    tags: ["guide-book", "e-book", "beginner-friendly"]
  },
  {
    id: "prod-18",
    wpId: "135",
    title: "Crypto Niche Reddit Account Age 5 years old Post Karma 3018 Comment Karma 20 Moderator on r/ecoin",
    category: "reddit-accounts",
    originalPrice: 550.00,
    salePrice: 450.00,
    age: "5 years",
    postKarma: 3018,
    commentKarma: 20,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=200",
    description: "High value digital asset with elite legacy authority. Moderator status in the r/ecoin community. 5-year mature registration with 3018 post karma.",
    link: "https://karmawhores.com/product/reddit-account-for-sale-3700-post-karma-16-comment-karma/",
    tags: ["crypto-mod", "moderator", "authority"]
  },
  {
    id: "prod-19",
    wpId: "510",
    title: "Cryptos/Blockchain Niche Reddit Account Age 2 years club Post Karma 3926 Comment Karma 137",
    category: "reddit-accounts",
    originalPrice: 105.99,
    salePrice: 100.00,
    age: "2 years",
    postKarma: 3926,
    commentKarma: 137,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=200",
    description: "Warmed-up account geared for talking cryptos, blockchain, web3 or financial niches. Fully active in relevant web3 subreddits with excellent sentiment score.",
    link: "https://karmawhores.com/product/cryptos-blockchain-niche-reddit-account-age6-years-club-post-karma-2617-comment-karma-103/",
    tags: ["web3", "crypto-ready"]
  },
  {
    id: "prod-20",
    wpId: "334",
    title: "High Karma Reddit Account Age 2 Years club Post Karma 97,238 Comment Karma 7808",
    category: "reddit-accounts",
    originalPrice: 800.00,
    salePrice: 750.00,
    age: "2 years",
    postKarma: 97238,
    commentKarma: 7808,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    description: "Absolute giant. Incredible 97k+ post history and 7.8k comment karma. Perfect score, massive post multiplier, fully optimized for frontpage viral campaigns.",
    link: "https://karmawhores.com/product/high-karma-reddit-account-age5-years-old-post-karma-4127-comment-karma-17850-trophy-case-gilding-ii-euphauric/",
    tags: ["viral-giant", "97k-karma", "super-authority"]
  }
];

export const products: Product[] = initialProducts.map(p => ({ ...p, image: redditProductIcon }));

export const blogArticles: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Mastering Reddit's Hidden Algorithms for Organic Traffic",
    snippet: "Discover how post velocity, upvote timing, and initial comment engagement dictate whether your content hits the front page.",
    publishedDate: "May 24, 2026",
    author: "KarmaWhores Analyst Team",
    image: "https://images.unsplash.com/photo-1542744173-8e0853c0380d?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    content: "Reddit uses a logarithmic decay formula to rank submissions on its Hot feeds. This means the first 10 to 50 upvotes have a dramatically higher influence on ranking score than the next 500 upvotes combined. To make a post trend, speed and aged account status are critical elements. Submitting with an account that has a proven history of positive contributions prevents automatic spam flagging. Combined with warm comments from multi-user nodes, you can safely guide native attention directly to your project without provoking native community friction."
  },
  {
    id: "blog-2",
    title: "Why Aged Accounts and CQS Metrics Matter Post-Update",
    snippet: "We break down Reddit's latest security upgrades including Content Quality Scores (CQS) and why basic accounts trigger instant capture codes.",
    publishedDate: "April 12, 2026",
    author: "Reddit Outreach Team",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
    readTime: "8 min read",
    content: "Recent modifications to Reddit's spam filter framework have introduced the Content Quality Score (CQS). This metric evaluates the IP address health, associated email verified status, age parameters, and karma velocity of the submitting user. Freshly registered profiles find themselves shadowbanned or repeatedly challenged with difficult captchas. Conversely, digital assets that have safely rested in the 2+ Year Club can bypass strict auto-moderation rules. That's why purchasing premium aged accounts with pre-warmed karma portfolios is the single most efficient route for executing a successful launch strategy."
  }
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Are these accounts ban-free and safe to use?",
    answer: "Absolutely. All our listed digital assets are aged organically using unshared private residential IP proxies. This ensures every account has a unique fingerprint and sits completely clear of past bans, suspensions, or warning flags."
  },
  {
    id: "faq-3",
    category: "Delivery",
    question: "How fast will I receive the purchased accounts or guide?",
    answer: "Our accounts package delivery takes place almost instantly! Once payment clearance triggers on your preferred method (PayPal, Cards, Google Pay, Apple Pay), our automated platform delivers credentials seamlessly via secure dashboard notifications and registered email details."
  },
  {
    id: "faq-4",
    category: "Refund Policy",
    question: "Do you offer a customer satisfaction refund guarantee?",
    answer: "Yes, we maintain a 100% full-refund policy. If under any unlikely circumstance an account gets deactivated before initial hand-over, or you feel unsatisfied with your custom comments boost service, contact our 24/7 London-based support team within 14 days for a full replacement or complete cash-back refund."
  },
  {
    id: "faq-5",
    category: "Services",
    question: "How does the custom Reddit Comments and Posts boost service work?",
    answer: "You provide us with the target post url or subreddit directory and your desired copywriting context. Our creative team prepares natural, conversational comments or posts and distributes them using warmed-up, elite aged-accounts. This steers organic discussion threads naturally and increases native click-through rates."
  }
];
