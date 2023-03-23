import "./Page404.css";

interface Page404Props {
	
}

function Page404(props: Page404Props): JSX.Element {
    return (
        <div className="Page404 flex-center-col">
        <h1>404 Page Not Found - the URL you've entered does not exist</h1>
        {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BBJa32lCaaY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
        </iframe> */}
    </div>
    );
}

export default Page404;
