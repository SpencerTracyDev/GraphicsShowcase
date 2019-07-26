Spencer Tracy
CS541 Project 2


2 Pass Algorithm
________________

I started by rendering the scene from the lights point of view.  I had to create 
special view and projection matrices to feed to the shadow vertex shader to create 
the point of view from the light instead of from the eye.  I rendered to a Frame Buffer 
Object using the built in fbo.h in the framework.  After this I simply wrote 
the depths of objects into the FBO and read it in as a texture in the next pass.  

The second pass (lighting) is the same as project 1 except I check if the pixel in question 
is in shadow by comparing it to the shadow map's depth values in the texture.  I access the 
correct uv coordinates in the texture by converting to texture coordinates with the shadowIndex 
variable.



Removing Shadow Acne
_____________________

To remove shadow acne I used front face culling while generating the shadow map.  
I noticed this removed the jumpy shadow acne present on all of the moving spheres, 
but it failed to do anything to alleviate the acne that riddled the floor of the scene.  

I started the next step of removing shadow acne by creating a small offset that would allow
the comparison of light depth to pixel depth to allow for small errors.  It took a while to 
mess with the freedom of error I was going to allow to achieve the right look.  I ended up 
using a value of 0.005 as my error tolerance in comparing the pixel depths.
