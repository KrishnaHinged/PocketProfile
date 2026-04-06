import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rocket, Zap, Shield, Sparkles, FileText, BarChart3, ArrowRight } from 'lucide-react';

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className="fixed z-30 w-full border-b border-app bg-[#f5f6f3]/95 backdrop-blur-sm">
                <div className="px-4 py-3 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-[#e63946]" />
                            <span className="text-[1.2rem] font-extrabold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                                PocketProfile
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            {user ? (
                                <Link to="/dashboard" className="btn-primary">
                                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-secondary hidden sm:inline-flex">Log in</Link>
                                    <Link to="/register" className="btn-primary">
                                        Get Started Free <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-[#ffe9ec] text-[#c92233] text-xs font-bold uppercase tracking-[0.16em] px-4 py-1.5 rounded-full mb-6">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered Resume Builder
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
                        Build Resumes That<br />
                        <span className="text-[#e63946]">Actually Land Jobs</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-app-muted max-w-2xl mx-auto leading-relaxed">
                        Stop guessing what recruiters want. PocketProfile combines AI enhancement,
                        real-time ATS scoring, and professional templates to help you ship applications faster.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to={user ? '/builder' : '/register'} className="btn-primary text-base px-8 py-3.5">
                            Start Building Now <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <a href="#features" className="btn-secondary text-base px-8 py-3.5">
                            See How It Works
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-y border-app bg-white/60 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { value: 'AI', label: 'Powered Enhancement' },
                        { value: '6+', label: 'Pro Templates' },
                        { value: 'ATS', label: 'Score Analysis' },
                        { value: 'PDF', label: 'Export Ready' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#e63946]">{stat.value}</div>
                            <div className="text-xs uppercase tracking-[0.12em] text-app-muted font-semibold mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-16 md:py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="hero-kicker">Features</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold mt-2">Everything You Need to Stand Out</h2>
                        <p className="text-app-muted mt-3 max-w-xl mx-auto">
                            A complete toolkit designed to move you from blank page to polished application in minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: 'AI Content Enhancement',
                                desc: 'Transform bullet points into impactful achievement statements with one click using Gemini AI.',
                            },
                            {
                                icon: <BarChart3 className="w-6 h-6" />,
                                title: 'Real-Time ATS Scoring',
                                desc: 'Get instant feedback on formatting, keywords, and readability scored against industry standards.',
                            },
                            {
                                icon: <FileText className="w-6 h-6" />,
                                title: 'Professional Templates',
                                desc: 'Choose from 6+ templates including ATS-safe Harvard format, Modern, Executive, and more.',
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: 'Live Preview',
                                desc: 'See changes instantly as you type. What you see is exactly what gets exported.',
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: 'ATS Safe Mode',
                                desc: 'One toggle to lock your resume into strict ATS-compatible formatting. No guesswork.',
                            },
                            {
                                icon: <Rocket className="w-6 h-6" />,
                                title: 'One-Click PDF Export',
                                desc: 'Download pixel-perfect PDFs ready to upload to any job portal instantly.',
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="feature-card group hover:border-[#e63946] transition duration-300">
                                <div className="w-12 h-12 rounded-xl bg-[#ffe9ec] text-[#e63946] flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-extrabold mb-2">{feature.title}</h3>
                                <p className="text-sm text-app-muted leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 md:py-24 px-4 bg-white/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="hero-kicker">Workflow</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold mt-2">Three Steps. One Killer Resume.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Fill Your Details', desc: 'Add personal info, experience, education, skills, and projects through guided forms.' },
                            { step: '02', title: 'Enhance with AI', desc: 'Let AI rewrite your content for maximum impact and run ATS analysis to optimize.' },
                            { step: '03', title: 'Export & Apply', desc: 'Choose a template, download your PDF, and start applying with confidence.' },
                        ].map((item) => (
                            <div key={item.step} className="text-center md:text-left">
                                <div className="text-5xl font-extrabold text-[#e63946]/15 mb-2">{item.step}</div>
                                <h3 className="text-xl font-extrabold mb-2">{item.title}</h3>
                                <p className="text-sm text-app-muted leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold">Ready to Build Smarter?</h2>
                    <p className="text-app-muted mt-4 text-base md:text-lg max-w-xl mx-auto">
                        Join PocketProfile and create your first professional resume in under 10 minutes.
                    </p>
                    <div className="mt-8">
                        <Link to={user ? '/builder' : '/register'} className="btn-primary text-base px-10 py-4">
                            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-app py-8 px-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Rocket className="h-4 w-4 text-[#e63946]" />
                        <span className="text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>PocketProfile</span>
                    </div>
                    <p className="text-xs text-app-muted">&copy; {new Date().getFullYear()} PocketProfile. Built for serious job seekers.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
