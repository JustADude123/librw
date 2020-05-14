uniform sampler2D tex0;
uniform sampler2D tex1;

uniform float u_coefficient;
uniform vec4 u_colorClamp;

varying vec4 v_color;
varying vec2 v_tex0;
varying vec2 v_tex1;
varying float v_fog;

void
main(void)
{
	vec4 color;

	vec4 pass1 = v_color;
	vec4 envColor = pass1;	// TODO: colorClamp
	pass1 *= texture2D(tex0, vec2(v_tex0.x, 1.0-v_tex0.y));

	vec4 pass2 = envColor*u_coefficient*texture2D(tex1, vec2(v_tex1.x, 1.0-v_tex1.y));

	pass1.rgb = mix(u_fogColor.rgb, pass1.rgb, v_fog);
	pass2.rgb = mix(vec3(0.0, 0.0, 0.0), pass2.rgb, v_fog);

	color.rgb = pass1.rgb*pass1.a + pass2.rgb;
	color.a = pass1.a;

	DoAlphaTest(color.a);

	gl_FragColor = color;
}
