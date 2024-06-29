const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 587,
    secure: false,
    auth: {
        user: 'administrateur@tech-shop.tech',
        pass: 'TechShop!A'
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

function sendEmail(mailOptions) {
    return transporter.sendMail(mailOptions);
}
// Endpoint pour envoyer des emails
app.post('/send-email', async (req, res) => {
    const { type, to, data } = req.body;

    let mailOptions;

    switch (type) {
        case 'confirmation':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Confirmation de commande',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Merci pour votre commande !</h2>
                            <p>Bonjour,</p>
                            <p>Nous avons bien reçu votre commande. Voici les détails :</p>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Produit</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Quantité</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Prix</th>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.productName}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.quantity}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${data.price}€</td>
                                </tr>
                            </table>
                            <p>Numéro de commande : <strong>${data.orderNumber}</strong></p>
                            <p>Merci pour votre achat !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'reset-password':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Réinitialisation de mot de passe',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #FFA500;">Demande de réinitialisation de mot de passe</h2>
                            <p>Bonjour,</p>
                            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
                            <a href="https://www.votre-site.com/reset-password?token=${data.token}" style="color: #4CAF50;">Réinitialiser mon mot de passe</a>
                            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'shipping-notification':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Votre commande a été expédiée',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #00BFFF;">Votre commande est en route !</h2>
                            <p>Bonjour,</p>
                            <p>Nous sommes heureux de vous informer que votre commande a été expédiée. Voici les détails :</p>
                            <p>Numéro de commande : <strong>${data.orderNumber}</strong></p>
                            <p>Vous pouvez suivre votre commande en cliquant sur le lien ci-dessous :</p>
                            <a href="https://www.votre-site.com/track-order?order=${data.orderNumber}" style="color: #4CAF50;">Suivre ma commande</a>
                            <p>Merci pour votre achat et à bientôt !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'birthday':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Joyeux Anniversaire !',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #FF69B4;">Joyeux Anniversaire !</h2>
                            <p>Bonjour ${data.name},</p>
                            <p>Nous vous souhaitons un très joyeux anniversaire ! Pour célébrer, nous vous offrons une réduction spéciale :</p>
                            <p><strong>Code promo : BIRTHDAY20</strong> - 20% de réduction sur votre prochaine commande.</p>
                            <p>Profitez de votre journée et de ce petit cadeau de notre part !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'account-confirmation':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Confirmation de création de compte',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Bienvenue chez nous !</h2>
                            <p>Bonjour ${data.name},</p>
                            <p>Votre compte a été créé avec succès. Nous sommes ravis de vous compter parmi nos clients.</p>
                            <p>Vous pouvez dès maintenant vous connecter et découvrir nos produits.</p>
                            <p>Merci de votre confiance et à bientôt !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'abandoned-cart':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Vous avez oublié des articles dans votre panier',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #FFA500;">N'oubliez pas vos articles !</h2>
                            <p>Bonjour ${data.name},</p>
                            <p>Vous avez des articles en attente dans votre panier. Voici un rappel :</p>
                            <ul>
                                ${data.items.map(item => `<li>${item.name} - ${item.price}€</li>`).join('')}
                            </ul>
                            <p>Ne manquez pas de finaliser votre commande avant que ces articles ne disparaissent !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'payment-confirmation':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Confirmation de paiement',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Paiement confirmé !</h2>
                            <p>Bonjour ${data.name},</p>
                            <p>Nous confirmons que nous avons bien reçu votre paiement pour la commande numéro <strong>${data.orderNumber}</strong>.</p>
                            <p>Votre commande est en cours de traitement et vous serez informé de son expédition prochainement.</p>
                            <p>Merci pour votre achat !</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'new-product':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Nouveau produit dans la catégorie',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Nouveau produit dans la catégorie ${data.categoryName}</h2>
                            <p>Bonjour ${data.userName},</p>
                            <p>Nous avons un nouveau produit dans la catégorie ${data.categoryName} :</p>
                            <ul>
                                <li>Nom du produit : ${data.productName}</li>
                                <li>Prix : ${data.price}</li>
                            </ul>
                            <p>Venez le découvrir sur notre site !</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'restock':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Produit de nouveau en stock',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Produit de nouveau en stock</h2>
                            <p>Bonjour ${data.userName},</p>
                            <p>Le produit ${data.productName} est de nouveau en stock !</p>
                            <p>Venez le découvrir sur notre site avant qu'il ne soit à nouveau en rupture de stock.</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'price-change':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Changement de prix',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #FFA500;">Changement de prix</h2>
                            <p>Bonjour ${data.userName},</p>
                            <p>Le prix du produit ${data.productName} a changé.</p>
                            <p>Nouveau prix : ${data.newPrice}€</p>
                        </body>
                    </html>
                `
            };
            break;

        case 'newsletter-signup':
            mailOptions = {
                from: 'administrateur@tech-shop.tech',
                to: to,
                subject: 'Inscription à la newsletter',
                html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #4CAF50;">Bienvenue à notre newsletter !</h2>
                            <p>Bonjour ${data.userName},</p>
                            <p>Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt des nouvelles et des offres exclusives.</p>
                            <p>Cordialement,<br>L'équipe TechShop</p>
                        </body>
                    </html>
                `
            };
            break;

            default:
                return res.status(400).json({ error: 'Type de mail non reconnu' });
        }
    
        try {
            await sendEmail(mailOptions);
            res.status(200).json({ message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email', details: error.message });
        }
    });

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});
