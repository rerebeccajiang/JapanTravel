const mongoose = require('mongoose');
const Japanplace = require('../models/japanplace')
const cities = require('./cities')
const { attractions } = require('./seedHelpers')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/japan-travel')
    .then(() => console.log("connection open!"))
    .catch(error => handleError(error));

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Japanplace.deleteMany({});
    const place1 = new Japanplace({
        author: '646fe62c904c7da778d1de7a',
        location: "Kitayama, Fujinomiya, Shizuoka 418-0112, Japan",
        name: "Mount Fuji",
        description: "Without a doubt Japan's most recognizable landmark, majestic Mount Fuji (Fuji-san) is also the country's highest mountain peak. Towering 3,776 meters over an otherwise largely flat landscape to the south and east, this majestic and fabled mountain is tall enough to be seen from Tokyo, more than 100 kilometers away.",
        price: 5000,
        geometry: {
            type: "Point",
            coordinates: [138.726379, 35.363602]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685055720/Japango/mountfuji_1_ozlabu.jpg',
                filename: 'Japango/mountfuji_1_ozlabu'
            },
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685055720/Japango/Mt-Fuji-themed2_npujwq.jpg',
                filename: 'Japango/Mt-Fuji-themed2_npujwq'
            }
        ]
    })
    await place1.save();

    const place2 = new Japanplace({
        author: '646fe62c904c7da778d1de7a',
        location: "Ukyo Ward, Kyoto, 616-8394, Japan",
        name: "Arashiyama Bamboo Grove",
        description: "This beautiful area of tall bamboo is just a few minutes' walk from the town center.",
        price: 0,
        geometry: {
            type: "Point",
            coordinates: [135.667007, 35.009392]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056128/Japango/bamboo1_laa5s1.jpg',
                filename: 'Japango/bamboo1_laa5s1'
            },
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056129/Japango/bamboo2_kitfng.jpg',
                filename: 'Japango/bamboo2_kitfng'
            }
        ]
    })
    await place2.save();

    const place3 = new Japanplace({
        author: '646fe62c904c7da778d1de7a',
        location: "1-1 Miyajimacho, Hatsukaichi, Hiroshima 739-0588, Japan",
        name: "The Island Shrine of Itsukushima, Miyajima",
        description: "Linked together by walkways and bridges, it's a fascinating place to explore, in particular its larger halls. These include the exquisite Honden (Main Hall), the Offerings Hall (Heiden), the Prayer Hall (Haiden), and the Hall of a Thousand Mats (Senjokaku)",
        price: 300,
        geometry: {
            type: "Point",
            coordinates: [132.3185, 34.2908]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056425/Japango/shrine1_qk3nmc.jpg',
                filename: 'Japango/shrine1_qk3nmc'
            },
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056426/Japango/shrin2_ikelfm.jpg',
                filename: 'Japango/shrin2_ikelfm'
            }
        ]
    })
    await place3.save();


    const place4 = new Japanplace({
        author: '646fe62c904c7da778d1de7a',
        location: "1-1 Osakajo, Chuo Ward, Osaka, 540-0002, Japan",
        name: "Osaka Castle",
        description: "Built in 1586 by famous Japanese warrior and politician Toyotomi Hideyoshi, Osaka Castle (Ōsaka-jō) was at the time the largest and most important fortress in the country. Although destroyed and rebuilt a number of times since, the present structure, built in 1931, remains true to the original.",
        price: 600,
        geometry: {
            type: "Point",
            coordinates: [135.53026310075683, 34.714642616393185]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056733/Japango/castle1_onm83n.webp',
                filename: 'Japango/castle1_onm83n'
            }
        ]
    })
    await place4.save();

    const place5 = new Japanplace({
        author: '646fe62c904c7da778d1de7a',
        location: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, 612-0882, Japan",
        name: "Fushimi Inari-taisha Shrine",
        description: "When you visit Fushimi Inari-taisha Shrine, you'll be seeing red – but in a beautiful way. One of the most important shrines in Japan, the Fushimi Inari shrine is found in southern Kyoto, made famous for the thousands (yes, thousands) of scarlet-colored gates that arch over a web of trails. These arch-covered trails command silence, so expect a very peaceful walk towards the forest around Mt. Inari.",
        price: 0,
        geometry: {
            type: "Point",
            coordinates: [135.7703, 34.9670]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1685056907/Japango/kotoyshrine1_ftpbee.webp',
                filename: 'Japango/kotoyshrine1_ftpbee'
            }
        ]
    })
    await place5.save();


    // for (let i = 0; i < 50; i++) {
    //     const random800 = Math.floor(Math.random() * 800);
    //     const price = Math.floor(Math.random() * 20) + 20;
    //     const place = new Japanplace({
    //         author: '64224136d9db5f190be2ae60',
    //         location: `${cities[random800].name}`,
    //         name: sample(attractions),
    //         description: 'awesome place',
    //         price: price,
    //         geometry: {
    //             type: "Point",
    //             coordinates: [-133, 47]
    //         },
    //         images: [
    //             {
    //                 url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1684857908/Japango/vouxawvbmyp7wqgr5hns.jpg',
    //                 filename: 'Japango/vouxawvbmyp7wqgr5hns'
    //             },
    //             {
    //                 url: 'https://res.cloudinary.com/dvluzn1gq/image/upload/v1684857908/Japango/pxmsq2uajxam27u3loqv.jpg',
    //                 filename: 'Japango/pxmsq2uajxam27u3loqv'
    //             }
    //         ]
    //     })
    //     await place.save();
    // }
}

seedDB().then(() => {
    mongoose.connection.close()
})