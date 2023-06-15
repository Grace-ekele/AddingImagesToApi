require( './config/config' );
const express = require( 'express' );
const familyRouter = require('./routes/route')
const PORT = 6789;


const app = express();
app.use( express.json() );
app.use( "/uploads", express.static( "uploads" ) );

app.use('/api', familyRouter)

app.listen( PORT, () => {
    console.log(`listening to port: ${ PORT }`);
});