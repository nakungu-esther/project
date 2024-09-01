const express = require('express');
const router = express.Router();

// import model
const Credit = require('../models/credit');
const Procure = require('../models/procurement');
const Signup = require('../models/signup');


router.get('/debit', (req, res) => {
    res.render('credit',{title: "Sales"});
})

router.post('/debit', async (req, res) => {
    try{
        const newCredit = new Credit(req.body);
        await newCredit.save();
        res.redirect('/mylist');
    } catch (error) {
        res.status(404).send("unable to save produce to db");
        console.log("Error saving produce",error);
    }

})
router.get('/mylist', async (req, res) => {
    try{
       const creditItems = await Credit.find();
       res.render('credit_list', {
       title: "Credit List",
       credits: creditItems,

    });

    } catch (error) {
        res.status(404).send("Unable to find items in the db");
        // console.log("Error fetching produce", error);
    
}
});



// get produce update form
router.get("/updateCredit/:id", async (req, res) => {
    try {
        const item = await Credit.findOne({ _id: req.params.id });
        res.render("update_credit", {
            title: "Update Produce",
            credit: item,
        });
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
});

router.get("/updateCredit/:id", async (req, res) => {
    try {
        const item = await Credit.findOne({ _id: req.params.id })
        res.render("update_credit", {
            credit: item,
            title: "Update Produce",
        })
    } catch(error) {
        res.status(400).send("Unable to find item in the database");
    }
    
    
});


// post updated produce
router.post("/updateCredit", async (req, res) => {
    try {
        await Credit.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/mylist");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});

//delete user
// delete Produce
router.post("/deleteCredit", async (req, res) => {
    try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect("back");
    } catch (err) {
    res.status(400).send("Unable to delete item in the database");
    }
    });



   //for the sell button
   router.get("/debit/:id", async(req, res) => {
    try {
    const agents = await Signup.find({ role: "sales_agent" });
    const procurement = await Procurement.findOne({ _id: req.params.id })
    res.render("credit", {
    title: "credit",
    agents: agents,
    procurement: procurement
    });
    } catch (error) {
    res.status(400).send("Unable to find sales agents in the database");
    }
    });
    
    router.post('/debit/:id', async (req, res) => {
    try {
    const { tonnage } = req.body;
    // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
    const procurement = await Procurement.findById({ _id: req.params.id });
    if (!procurement) {
    return res.status(404).send('produce not found');
    }
    
    if (procurement.tonnage < tonnage ) {
    return res.status(400).send(`Not enough tones in stock,there are ${procurement.tonnage} Kgs in stock`);
    }
    if (procurement && procurement.tonnage > 0) {
    const newCredit = new Credit(req.body);
    await newCredit.save();
    procurement.tonnage -= tonnage; // short form of what is below
    // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
    await procurement.save();
    res.redirect("/mylist");
    } else {
    return res.status(404).json({ error: 'Produce out of stock' });
    }
    } catch (error) {
    console.error('Error saling produce:', error);
    return res.status(500).json({ error: 'Internal server error' });
    }
    });


// retrieve sales from the database
router.get("/mylist", async (req, res) => {
    try {
    const credit = await Credit.find()
    .sort({$natural:-1})
    .populate("produceName", "produceName")
    .populate("salesAgent", "firstName lastName")
    res.render("creditlist", {
    title: "Credit List",
    credit: credit,
    });
    } catch (error) {
    res.status(400).send("Unable to find items in the database");
    }
    });

   

    router.get("/receipt1/:id", async (req, res) => {
        try{
            const credit = await Credit.findOne({_id: req.params.id})
            .populate("produceName","produceName")
            .populate("salesAgent","name");
            console.log("my sale",credit)
            // const formattedDate = formatDate(sale.saledate);
            res.render("receipt1",{
                credit,
                // formattedDate,
                title: "Receipt"
            });
        } catch (error) {
            res.status(400).send("The item isn't in the database")
        }

    })




module.exports = router;