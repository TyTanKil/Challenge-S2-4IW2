const {Router} = require("express");
const Newsletter = require("../models/newsletter");
const Account = require("../models/account");
const checkAuthAdmin = require("../middlewares/checkAuthAdmin");
const router = new Router();
const { sendEmail } = require("../mailer");
const newsletter = require("../templates-mail/newsletter");

router.get("/", checkAuthAdmin, async (req, res, next) => {
    const newsletter = await Newsletter.findAll();
    res.json(newsletter);
});

router.post("/", checkAuthAdmin, async (req, res, next) => {
    try {
        delete req.body.sent;
        await Newsletter.create({
            ...req.body
        });
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", checkAuthAdmin, async (req, res, next) => {
    try {
        const email = await Newsletter.findByPk(parseInt(req.params.id));
        if (email) {
            res.json(email);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", checkAuthAdmin, async (req, res, next) => {
    try {
        const email = await Newsletter.findByPk(parseInt(req.params.id));
        if (!email || (req.body.date && new Date(req.body.date) <= new Date() || email.sent)) {
            res.sendStatus(404);
        }else{
            delete req.body.sent;
            const [nbUpdated, usersAddress] = await Newsletter.update(req.body, {
                where: {
                    id: parseInt(req.params.id),
                }, returning: true, individualHooks: true,
            });
            if (usersAddress[0]) {
                res.json(usersAddress[0]);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", checkAuthAdmin, async (req, res, next) => {
    try {
        const nbDeleted = await Newsletter.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (nbDeleted === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.put("/:id", checkAuthAdmin, async (req, res, next) => {
    try {
        const email = await Newsletter.findOne({
            where: {
                id: parseInt(req.params.id),
            }
        });
        if (!email || (req.body.date && (new Date(req.body.date) <= new Date() || (new Date(email.date) <= new Date() || email.sent === true)))) {
            res.sendStatus(400);
        }else{
            delete req.body.sent;
            const nbDeleted = await Newsletter.destroy({
                where: {
                    id: parseInt(req.params.id),
                },
            });
            await Newsletter.create({
                ...req.body, id: parseInt(req.params.id),
            });
            res.sendStatus(nbDeleted ? 200 : 201);
        }
    } catch (e) {
        next(e);
    }
});

router.post("/send-newsletter", checkAuthAdmin, async (req, res, next) => {
    try {
        let emails = await Newsletter.findAll({
            where: {
                date: new Date().toISOString().split("T")[0],
                sent: false,
            },
        });
        let accounts = await Account.findAll({
            where: {
                newsletter: true,
            },
        });
        if(accounts.length === 0 || emails.length === 0){
            res.sendStatus(404);
        }else{
            for (let email of emails) {
                const mailOptions = newsletter({
                    to: accounts.map(account => account.email),
                    object: email.object,
                    content: email.content,
                });

                await sendEmail(mailOptions);

                await Newsletter.update({
                    sent: true,
                }, {
                    where: {
                        id: email.id,
                    },
                });
            }
            res.sendStatus(201);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
