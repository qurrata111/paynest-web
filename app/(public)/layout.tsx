const PublicLayout = ({ children}: any) => {

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-mono bg-amber-300 text-black">
            {children}
        </div>
    )
}

export default PublicLayout;