import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

export default function ProductDetailPage(props) {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.productid;

    // data because the data folder is the location of data we are looking for
    // dummy-data.json is the file we need to use for this path
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    // JSON.parse converts the jsonData into a regular javascript object
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { productid: 'p1' } },
            { params: { productid: 'p2' } },
            { params: { productid: 'p3' } },
            { params: { productid: 'p4' } },
        ],
        fallback: false
        // paths: [
        //     { params: { productid: 'p1' } },
        // ],
        // With fallback:true it tells NextJS pages not listed under "paths:" can be
        // valid values that should be loaded when they are visited
        // they are not pre-generated, however they are generated just in time when
        // the request reaches the server
        // fallback: true
    };
}