/////////////////////////////////////////////////////////////////////////
// Vertex shader for the final pass
//
// Copyright 2013 DigiPen Institute of Technology
////////////////////////////////////////////////////////////////////////
#version 330

void PhongVS();

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix, ViewInverse;
uniform mat4 ProjectionMatrix;
uniform mat4 NormalMatrix;

in vec4 vertex;
in vec3 vertexNormal;
in vec2 vertexTexture;
in vec3 vertexTangent;

out vec3 tangent;
out vec2 texCoord;

out vec3 normalVec, eyeVec;

out float position;

void main()
{ 
	position = (ProjectionMatrix*ViewMatrix*ModelMatrix*vertex).w;

    gl_Position = ProjectionMatrix*ViewMatrix*ModelMatrix*vertex;
}
