function Container({ className, children }) {
    return (
        <main className={`px-10 lg:px-0 lg:max-w-7xl mx-auto ${className}`}>
            {children}
        </main>
    );
}

export default Container;
