/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                body: {
                    dark: "#18191A",
                    light: "#F0F2F5",
                },
                "primary": "#4374e8",
                // 400: "#4374e8"
                secondary: {
                    50: "#24d047",
                    100: "#24d047",
                    200: "#24d047",
                    300: "#24d047",
                    400: "#11a631",
                },
                gray: {
                    "9": "#eeeeee"
                },
                "gray-dark": {
                    "9": "#8c8c8c"
                },
                blue: "#1877F2",
                cherry: "#F3425F",
                grape: "#9360F7",
                lemon: "#F7B928",
                lime: "#45BD62",
                pink: "#FF66BF",
                seafoam: "#54C7EC",
                teal: "#2ABBA7",
                tomato: "#FB724B",
                link: "#216FDB",
                dark: {
                    10: "#fbfcfe",
                    50: "#c0c0c0",
                    100: "#a2a2a2",
                    200: "#838383",
                    300: "#696969",
                    400: "#525252",
                    500: "#444444",
                    600: "#363636",
                    650: "#282828",
                    700: "#252525",
                    750: "#242526", // card-bg fb
                    800: "#171717",
                    850: "#050505", // fb
                    900: "#0a0a0a",
                    950: "#0E0E0E",
                    999: "#050505",
                },
                light: {
                    10: "#494949",
                    50: "#5b5b5b",
                    100: "#727272",
                    200: "#818181",
                    300: "#949494",
                    400: "#ababab",
                    500: "#b9b9b9",
                    600: "#d0d0d0",
                    700: "#dcdcdc",
                    800: "#eaeaea",
                    850: "#E4E6EB", // fb
                    900: "#f8f8f8",
                    950: "#fdfdfd",
                }
            },
            boxShadow: {
                a: "1px 7px 27px -1px #595959",
                b: "0px 11px 22px -6px rgba(0, 0, 0, 0.17)",
                y_xx: "0 1px 2px #89898978"
            },
            invert: {
                89: ".89"
            },
            hueRotate: {
                185: '185deg'
            },
            sepia: {
                6: '6%'
            },
            screens: {
                'xs': '450px',
                // => @media (min-width: 992px) { ... }
            },
        },
    },
    plugins: [

    ],
}