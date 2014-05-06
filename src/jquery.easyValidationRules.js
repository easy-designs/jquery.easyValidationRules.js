/*! Easy Validation Rules (c) Aaron Gustafson (@AaronGustafson). MIT License. https://github.com/easy-designs/jquery.easyValidationRules.js */

/* Easy Validation Rules
 * 
 * This script makes it simple to create multiple validation rules
 * for a single field.
 * 
 * The API
 * =======
 * 
 * To use the script, add the `data-validation-rules` attribute to
 * the field and set the a reference to the rules container as the value:
 * 
 * 	<input type="text" name="username" required="required"
 *		data-validation-rules="username-rules"
 * 		>
 * 
 * Then include a list of rules in your markup within a container with
 * that ID. Rules are indicated by a `data-validation-rules-rule` 
 * attribute with a regular expression string value:
 * 
 * 	<ul id="username-rules">
 * 		<li data-validation-rules-rule="[A-Z]+">At least one capital letter</li>
 * 		<li data-validation-rules-rule="[a-z]+">At least one lowercase letter</li>
 * 		<li data-validation-rules-rule="[\d]+">At least one number</li>
 * 	</ul>
 * 
 * Then call the plugin on a field container (like the `form` or the `body`):
 * 
 * 	$('form').easyValidationRules();
 * 
 * You can configure the classes this plugin uses by passing them to the 
 * plugin as part of a configuration object:
 * 
 * 	$('form').easyValidationRules({
 * 		field_invalid_class: 'my-custom-invalid',
		field_valid_class: 'my-custom-valid'
 * 	});
 * 
 * Configuration options are as follows:
 * 
 *  - `trigger_event`
 *    The event to trigger validation on
 *    Default: "keydown"
 *  - `each_delay`
 *    Delay between each rule being classified
 *    Default: 150
 *  - `field_invalid_class`
 *    The `class` to apply when the field is invalid
 *    Default: "validation-invalid"
 *  - `field_valid_class`
 *    The `class` to apply when the field is valid
 *    Default: "validation-valid"
 *  - `rule_unmatched_class`
 *    The `class` to apply when the rule’s requirement are not met
 *    Default: "validation-unmatched"
 *  - `rule_matched_class`
 *    The `class` to apply when the rule’s requirement are met
 *    Default: "validation-matched"
 * 
 **/
;(function( $ ){
	
	var 
	data = 'data-',
	data_attr = 'validation-rules',
	data_rule_attr = 'validation-rules-rule',
	defaults = {
		trigger_event: 'keyup',
		each_delay: 150, // half a second
		field_invalid_class: 'validation-invalid',
		field_valid_class: 'validation-valid',
		rule_unmatched_class: 'validation-unmatched',
		rule_matched_class: 'validation-matched'
	};
	
	// jQuery object
	$.fn.easyValidationRules = function( config ){
		
		// grab the container
		var $container = $(this);
		
		// Override defaults
		config = $.extend( defaults, config );
		
		// Regex validation function
		function validates( value, str_regex )
		{
			var re = new RegExp( str_regex ),
				match = value.match( re );
				
			return ( match != null && match.length > 0 );
		}
		
		function toggleMatchedClasses( $rule, matched )
		{
			if ( matched )
			{
				$rule
					.addClass( config.rule_matched_class )
					.removeClass( config.rule_unmatched_class );
			}
			else
			{
				$rule
					.addClass( config.rule_unmatched_class )
					.removeClass( config.rule_matched_class );
			}
		}
		
		// Find the validation fields
		$container.find( '[' + data + data_attr + ']' )
			.each(function(){
			
				var $field = $(this),
					// rules are [data-validation-rules-rule] inside the id referenced item
					$rules = $( '#' + $field.data( data_attr ) )
								.find( '[' + data + data_rule_attr + ']' ),
					// total # to match
					rule_count = $rules.length;
			
				if ( rule_count > 1 )
				{
					// watch
					$field.on( config.trigger_event, function(){
						
						var $field = $(this),
							// the value
							value = $field.val(),
							// none are valid by default
							matched_rules = 0;

						// loop the rules
						$rules.each(function( i ){

							var $rule = $(this),
								// grab the rule
								regex = $rule.data( data_rule_attr ),
								// try validating
								matched = ( regex && validates( value, regex ) );

							// Increase the count?
							if ( matched )
							{
								matched_rules++;
							}

							// toggle the classes
							setTimeout(function(){
								
								toggleMatchedClasses( $rule, matched );
								
							}, i * config.each_delay );

						});

						// Did we match all of the rules?
						if ( matched_rules == rule_count )
						{
							$field
								.addClass( config.field_valid_class )
								.removeClass( config.field_invalid_class );
						}
						// nope
						else
						{
							$field
								.addClass( config.field_invalid_class )
								.removeClass( config.field_valid_class );
						}
					});
				}
			
			});
		
		return $container;
		
	};
	
}( jQuery ));