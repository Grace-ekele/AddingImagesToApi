const express = require( 'express' );
const router = express.Router();
const { createProfile, getProfiles, getProfile, updateProfile, deleteProfile} = require( '../controllers/controller' );
const upload = require('../multer/multer')


router.post( '/profiles', upload.fields( [ { name: "ChildrenImage", maxCount: 10 } ] ), createProfile );
router.get( '/profiles', getProfiles );
router.get( '/profiles/:id', getProfile );
router.put( '/profiles/:id', upload.fields( [ { name: "ChildrenImage", maxCount: 10 } ] ), updateProfile );
router.delete( '/profiles/:id', deleteProfile );

module.exports = router;