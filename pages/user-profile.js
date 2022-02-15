export default function UserProfilePage(props) {
    return (
        <h1>{props.username}</h1>
    )
}

export async function getServerSideProps(context) {
    // req and res are the official NodeJS default incoming message and response object
    const { params, req, res } = context;

    return {
        props: {
            username: 'Max'
        }
    };
}