# Language Vote
![Screenshot of app](https://utfs.io/f/XYf3vgwsdO6e0VFQIJsd2IdWxTYK378LAQVFOrB5EpyXgtvk)
Demo: https://vote.lukegibson.dev/
### Description
Vote for your favorite language. Your language not there add it. 
Made in Next.js with typescript, Shad/cn, tailwind css and postgres database.
To stop people form voting more than once I use fingerprintjs to fingerprint
the users' browser. Then store that fingerprint in my database then when they
create a vote a flag will be flipped to stop them from voting again. The same also happens when adding a language. 
This system was implemented to stop people from abusing the system and sending in an insane amount of votes or fake languages.
Making the site useless or data inaccurate.

### How to vote:
1. Go to https://vote.lukegibson.dev/
2. Allow browser fingerprinting
3. Select your favorite language. Not There add fill in a name and description