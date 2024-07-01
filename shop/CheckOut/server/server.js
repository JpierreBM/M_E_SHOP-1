import express from "express";
import cors from "cors";



//mercado pago
import { MercadoPagoConfig, Preference} from "mercadopago";
const client = new MercadoPagoConfig({ accesToken: "YOUR_ACCES_TOKEN"});

const app = express();
const port = 5000;

app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());


app.use(express.static( "/M_E_SHOP/shop/CheckOut/index.html-js"))

app.get("../", (req, res) =>{

res.sendFile(__dirname,  "M_E_SHOP, shop, CheckOut, index.html-js")
});


app.post("/create_preference", async (req, res) =>{
    try{
        const body = {
            items:[
                {
                    image: req.body.image,
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                }
            ],
            back_urls:{
                succes:"http://127.0.0.1:5500/M_E_SHOP/shop/index.html",
                failure:"http://127.0.0.1:5500/M_E_SHOP/shop/CheckOut/index.html",
                pending:"",
            },
            auto_return:"approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,

        });
    }catch (error){
        console.log(error)
        res.status(500).json({
            error: "error al crear preferencia"
        })
    }
})

app.listen(port, () => {

    console.log(`servidor iniciado en el puerto ${port}`);
})