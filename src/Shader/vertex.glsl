#version 300 es

in vec4 vertex;
uniform mat4 u_perspective;
uniform mat4 u_modelview;

void main() {
    gl_Position = u_perspective * u_modelview * vertex;
}