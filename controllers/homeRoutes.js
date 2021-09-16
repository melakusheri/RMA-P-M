const router = require('express').Router();
const { County, User, Museum, Park } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
      console.log(req.session);
      countyData = await County.findAll();

      console.log(countyData[0]);
         const Counties = countyData.map(county => county.get({ plain: true }));
         res.render('homepage', { 
            Counties, 
            loggedIn: req.session.loggedIn});
      
   } catch (error) {
      console.log(err);
         res.status(500).json(err);
   }
});

router.get('/login', (req, res) => {
   if (req.session.loggedIn) {
     res.redirect('/');
     return;
   }
 
   res.render('loginandout');
});

router.get('/county/:id', withAuth, async (req, res) => {
   try {
      const countyData = await County.findByPk(req.params.id);
      const parkData = await Park.findAll({where: {county_id: req.params.id}});
      const museumData = await Museum.findAll({where: {county_id: req.params.id}});

      const county = countyData.get({ plain: true });
      const parks = parkData.map((p) => p.get({ plain: true }));
      const museums = museumData.map((m) => m.get({ plain: true }));

     // res.status(200).json({ county, park, museum });
      res.render('county', {
         county,
         parks,
         museums,
         loggedIn: req.session.loggedIn
      });
   } catch (err) {
      console.log(err)
      res.status(500).json(err);
   }
});

module.exports = router;
