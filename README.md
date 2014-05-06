This script makes it simple to create multiple validation rules
for a single field.

The API
=======

To use the script, add the `data-validation-rules` attribute to
the field and set the a reference to the rules container as the value:

	<input type="text" name="username" required="required"
 	data-validation-rules="username-rules"
		>

Then include a list of rules in your markup within a container with
that ID. Rules are indicated by a `data-validation-rules-rule` 
attribute with a regular expression string value:

	<ul id="username-rules">
		<li data-validation-rules-rule="[A-Z]+">At least one capital letter</li>
		<li data-validation-rules-rule="[a-z]+">At least one lowercase letter</li>
		<li data-validation-rules-rule="[\d]+">At least one number</li>
	</ul>

Then call the plugin on a field container (like the `form` or the `body`):

	$('form').easyValidationRules();

You can configure the classes this plugin uses by passing them to the 
plugin as part of a configuration object:

	$('form').easyValidationRules({
		field_invalid_class: 'my-custom-invalid',
 	field_valid_class: 'my-custom-valid'
	});

Configuration options are as follows:

 * `trigger_event` - The event to trigger validation on. **Default: "keydown"**
 * `each_delay` - Delay between each rule being classified. **Default: 150**
 * `field_invalid_class` - The `class` to apply when the field is invalid. **Default: "validation-invalid"**
 * `field_valid_class` - The `class` to apply when the field is valid. **Default: "validation-valid"**
 * `rule_unmatched_class` - The `class` to apply when the rule’s requirement are not met. **Default: "validation-unmatched"**
 * `rule_matched_class` - The `class` to apply when the rule’s requirement are met. **Default: "validation-matched"**