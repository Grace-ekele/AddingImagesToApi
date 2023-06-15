const express = require( 'express' );
const familyModel = require( '../models/model' );
const fs = require( 'fs' );


// create new family profile
const createProfile = async ( req, res ) => {
    
    const { fathersName, mothersName, Children } = req.body;
    const profile = new familyModel( {
        fathersName,
        mothersName,
        Children,
        ChildrenImage: req.files[ "ChildrenImage" ][ 0 ].filename,
        

    } );
    try {
        const savedProfile = await profile.save();
        if ( savedProfile ) {
            res.status( 201 ).json( {
                message: "Profile saved successfully",
                data: savedProfile
            })
        } else {
            res.status( 400 ).json( {
                message: "Could not create profile"
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familyModel.find();
        if ( profiles.length === 0 ) {
            res.status( 400 ).json( {
                message: "No profile is available"
            })
        } else {
            res.status( 200 ).json( {
                message: "All profiles",
                data: profiles,
                totalProfiles: profiles.length
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const getProfile = async ( req, res ) => {
    try {
        const profileId = req.params.id;
        const profile = await familyModel.findById( profileId );
        if ( !profile ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
  const profileId = req.params.id;
  const profile = await familyModel.findById( profileId );
  try {
    const { fathersName, mothersName, Children } = req.body;
    const updateFields = {
        fathersName: fathersName || profile.fathersName,
        mothersName: mothersName || profile.mothersName,
        Children: Children || profile.Children,
        ChildrenImage: profile.ChildrenImage,
      };

    if (req.files && req.files["ChildrenImage"]) {
      const oldProfileImagePath = `uploads/${profile.ChildrenImage}`;
      if (fs.existsSync(oldProfileImagePath)) {
        fs.unlinkSync(oldProfileImagePath);
      }
      updateFields.ChildrenImage = req.files.ChildrenImage.map((child)=>child.filename);
    }

    const updatedProfile = await familyModel.findByIdAndUpdate(
      profileId,
      updateFields,
      { new: true }
      );
      console.log(updatedProfile)
    if (updatedProfile) {
      res.status(200).json({
        message: 'Updated successfully',
        data: updatedProfile,
      });
    } else {
      res.status(404).json({
        message: 'Profile not found.',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a family
const deleteProfile = async (req, res) => {
  const profileId = req.params.id;
  try {
    const profile = await familyModel.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found.',
      });
    }
    const profileImagePath = `uploads/${profile.profileImage}`;
    if (fs.existsSync(profileImagePath)) {
      fs.unlinkSync(profileImagePath);
    }
    await familyModel.findByIdAndDelete(profileId);
    res.status(200).json({
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile
}