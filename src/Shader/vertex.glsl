#version 300 es

in vec4 a_position;
uniform mat4 u_perspective;
uniform mat4 u_view;
uniform mat4 u_model;

void main() {
    gl_Position = u_perspective * u_view * u_model * a_position;
}