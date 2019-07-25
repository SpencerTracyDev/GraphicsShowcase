/////////////////////////////////////////////////////////////////////////
// Pixel shader for the final pass
//
// Copyright 2013 DigiPen Institute of Technology
////////////////////////////////////////////////////////////////////////
#version 330

#define M_PI 3.1415926535897932384626433832795

uniform int mode;
uniform bool useTexture;
uniform bool earth;

uniform vec3 phongDiffuse;
uniform vec3 phongSpecular;
uniform float phongShininess;

uniform vec3 lightValue, lightAmbient;

uniform sampler2D groundColor, earthDay, earthNight;

in vec3 normalVec, lightVec, eyeVec;
in vec2 texCoord;

/**
 * Phong version of BRDF
 */
float D(vec3 H, vec3 N){
	float alpha = 120.0f;

	return ((alpha + 2) / (2 * M_PI)) * pow( max(0.0f, dot(N, H)), alpha);
}

/** 
 * Micro-facet F calculation 
 */
float F(vec3 L, vec3 H){
	
	if(earth){
		//Earth Calc
		float Ks = 0.03 * texture(earthNight, texCoord.st).r;

		//Fresnel
		return Ks + ((1 - Ks) * pow((1 - (max(0.0f, dot(L, H)))), 5));

	} else {
		//Floor Tex Calc
		float Ks = 0.03f;
		return Ks + ((1 - Ks) * pow((1 - (max(0.0f, dot(L, H)))), 5));
	}

	//return 1;
}

void main()
{
    vec3 N = normalize(normalVec);
    vec3 V = normalize(eyeVec);   
    vec3 L = normalize(lightVec);

	vec3 H = normalize(L + V);

	
	vec3 Kd = phongDiffuse;

	float NdotL = dot(N, L);
	
	if (useTexture){
		if(earth){
			if(NdotL > 0){
				Kd = texture(earthDay, texCoord.st * -1).xyz;


				vec3 white = vec3(1);
				
				//Cloud cover

				/* TEST
				if(texture(earthNight, texCoord.st).b > 0){
					Kd.r = texture(earthNight, texCoord.st).b;
					Kd.g = texture(earthNight, texCoord.st).b;
					Kd.b = texture(earthNight, texCoord.st).b;
				}
				*/
				Kd = mix(Kd, white, texture(earthNight, texCoord.st * -1).b);
				
				vec3 BRDF = Kd / M_PI  +  ((D(H, N) * F(L, H)) / 4.0f) * 1/pow(max(0.0f, dot(L, H)), 2);



				gl_FragColor.xyz = BRDF * max(0.0f, NdotL) * lightValue * M_PI;
			} else {
				Kd.r = texture(earthNight, texCoord.st * -1).g;
				Kd.g = texture(earthNight, texCoord.st * -1).g;
				Kd.b = texture(earthNight, texCoord.st * -1).g;
				gl_FragColor.rgb = Kd;
			}
		} else {
			Kd = texture(groundColor, 2.0 * texCoord.st * -1).xyz;

			vec3 BRDF = Kd / M_PI  +  (D(H, N) * F(L, H)) / 4.0f;

			gl_FragColor.xyz = BRDF * max(0.0f, NdotL) * lightValue * M_PI;
		}
	} else {
		vec3 BRDF = Kd / M_PI  +  (D(H, N) * F(L, H)) / 4.0f;
		gl_FragColor.xyz = BRDF * max(0.0f, NdotL) * lightValue * M_PI;
	}
	
	









	/* OLD
    vec3 Kd = phongDiffuse;
    if (useTexture)
        Kd = texture(groundColor,2.0*texCoord.st).xyz;

    gl_FragColor.xyz = max(0.0, dot(L, N))*Kd;
	*/





}