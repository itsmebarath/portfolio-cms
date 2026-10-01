import { useState } from "react";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Services", href: "#services" },
        { name: "Experience", href: "#experience" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Blogs", href: "#blogs" },
        { name: "Contact", href: "#contact" }
    ];

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">

            {/* Navbar Container */}

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Logo */}

                <a
                    href="#home"
                    onClick={closeMenu}
                    className="shrink-0 text-xl font-bold tracking-tight text-gray-900"
                >
                    Barathraj <span className="text-violet-600">.A</span>
                </a>


                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-5 xl:flex">

                    {navigation.map((item) => (

                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-violet-600"
                        >
                            {item.name}
                        </a>

                    ))}

                </nav>


                {/* Desktop Let's Talk Button */}

                <a
                    href="#contact"
                    className="hidden shrink-0 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-200 xl:inline-flex"
                >
                    Let's Talk
                </a>


                {/* Mobile / Tablet Menu Button */}

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 xl:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? "✕" : "☰"}
                </button>

            </div>


            {/* Mobile / Tablet Navigation */}

            {mobileMenuOpen && (

                <div className="border-t border-gray-100 bg-white px-6 py-5 shadow-xl xl:hidden">

                    <nav className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">

                        {navigation.map((item) => (

                            <a
                                key={item.name}
                                href={item.href}
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                            >
                                {item.name}
                            </a>

                        ))}

                    </nav>


                    {/* Mobile Let's Talk Button */}

                    <a
                        href="#contact"
                        onClick={closeMenu}
                        className="mt-4 flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                    >
                        Let's Talk
                    </a>

                </div>

            )}

        </header>
    );
}

export default Navbar;