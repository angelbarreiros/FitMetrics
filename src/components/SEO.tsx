import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    pageImage?: string;
    tags?: React.JSX.IntrinsicElements[]
}

export const SEO = ({
    title = "Default Title",
    description = "Default description of your app",
    keywords = "react, typescript, webapp",
    pageImage = "/vite.svg"


}: SEOProps) => {
    return (
        <Helmet defer={false}>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="icon" type="image/svg+xml" href={pageImage} />
        </Helmet>
    );
};