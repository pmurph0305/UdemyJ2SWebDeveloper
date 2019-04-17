import Link from 'next/link';

const Index = () => (
    <div>
        <h1>SSR Rendering</h1>
        <p>This is an example</p>
        <a href='./about'>about page anchor tag...</a>
        {/* Using link, you can only load the portion required, using the a tag above, more requests are made for the full page load. */}
        <Link href='./about'>
            <button>about link</button>
        </Link>
        <Link href='./robots'>
            <button>robots link</button>
        </Link>
    </div>
)

export default Index;
