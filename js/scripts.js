$(document).ready(function () {
  // Use JSON to configure parts of the form that are likely to change
  // Why? I don't want to do configuration in HTML, and JSON is readable enough.
  // Set config values
  $.getJSON("config/settings.json", function(result){

    // Insert settings variables into the HTML
    $.each(result, function(key, value){
      switch(value.settings_name) {
        case 'logo_path':
          $('.logo-path').append('<img class="logo" src="' + value.settings_value + '" />');
          break;
        case 'org_name':
          $('.org-name').append(value.settings_value);
          break;
        case 'url_example':
          $('.url-example').append('<span class="highlight">' + value.settings_value + '</span>');
          break;
        case 'source_example':
          var examples = value.settings_value.split(",");
          $.each(examples, function(example_key, example_value) {
            $('.source-example').append('<span class="highlight">' + example_value + '</span>');
          });
          break;
        case 'campaign_nickname_example':
          var nicknames = value.settings_value.split(",");
          $.each(nicknames, function(nickname_key, nickname_value) {
            $('.campaign-nickname-example').append('<span class="highlight">' + nickname_value + '</span>');
          });
          break;
        default:
          break;
      }
    });

  });

  // Build and add the Medium select list
  $.getJSON("config/medium.json", function(result){
    $.each(result, function(key, value){
      $('#medium').append('<option value="' + value.medium_value + '">' + value.medium_label + '</option>');
    });
  });

  // Build and add the Owner select list
  $.getJSON("config/campaign_owner.json", function(result){
    $.each(result, function(key, value){
      $('#campaign-owner').append('<option value="' + value.campaign_owner_value + '">' + value.campaign_owner_label + '</option>');
    });
  });

});

// Remove the generated campaign URL when a form field is changed to force
// the user to bake a new URL so they don't accidentally copy the old one
$('form').on('change', function() {
  $( "textarea" ).text("");
});

// Form submit handler
$( "form #submit" ).on( "click", function() {

  // Form validation
  // Set some variables
  var error_field = [];
  var error_flag = 0;

  // Set the error flag to 1 if site path, source or medium field values are empty
  // and prep the error message with the offending field name
  if (!$('#site-path').val()) {
    error_flag = 1;
    error_field.push('URL');
  }

  if (!$('#source').val()) {
    error_flag = 1;
    error_field.push('Source');
  }

  if (!$('#medium').val()) {
    error_flag = 1;
    error_field.push('Medium');
  }

  if (error_flag > 0) {
    // Validation fails. Tell the user which form fields need attention
    alert('Please check these fields for values:\n' + error_field.join('\n'));
  } else {
    // Validation succeeds. Do some stuff
    // Build the campaign URL
    var str = "";
    str = str + $('input[name=protocol]:checked').val() + '://';
    var url = $('#site-path').val();
    // Nuke a protocol if the user included it with the URL
    str = str + url.replace(/(^\w+:|^)\/\//, '') + '?';
    str = str + 'utm_source=' + $('#source').val();
    str = str + '&utm_medium=' + $('#medium option:selected').val();

    if ($('#campaign-owner').val()) {
      str = str + '&utm_campaign=' + $('#campaign-owner option:selected').val();
    }

    if ($('#campaign-nickname').val()) {
      str = str + '_' + $('#campaign-nickname').val();
    }

    // Put campaign URL into the textarea field;
    // Make everything lowercase and change spaces to underscores
    //str = str.toLowerCase().replace(/ /g,"_");
    $("textarea").text(str);
    console.log(str);
  }
});

// Copy to clipboard button function
$('#copy-to-clipboard').on( "click", function() {
  $("textarea").focus();
  $("textarea").select();
  document.execCommand('copy');
});

// Copyright year
document.getElementById("year").innerHTML = new Date().getFullYear();

// Remove campaign URL generated code when a field is changed in the form
$('form').on('change', function() {
  $( "textarea" ).text("");
});

// Submit handler
$( "form #submit" ).on( "click", function() {

  // Error handling
  var error_field = [];
  var error_flag = 0;

  if (!$('#site-path').val()) {
    error_field.push('URL');
    error_flag = 1;
  }

  if (!$('#source').val()) {
    error_field.push('Source');
    error_flag = 1;
  }

  if (!$('#medium').val()) {
    error_field.push('Medium');
    error_flag = 1;
  }

  if (error_flag > 0) {
    alert('Please check these fields for values:\n' + error_field.join('\n'));
  } else {
    // Build the campaign URL
    var str = "";
    var str = str + $('input[name=protocol]:checked').val() + '://';
    var url = $('#site-path').val();
    var str = str + url.replace(/(^\w+:|^)\/\//, '') + '?';
    var str = str + 'utm_source=' + $('#source').val();
    var str = str + '&utm_medium=' + $('#medium option:selected').val();

    if ($('#name').val()) {
      var str = str + '&utm_campaign=' + $('#name option:selected').val();

      if ($('#namespace').val()) {
        var str = str + '_' + $('#namespace').val();
      }

    }

    // Put campaign URL into the textarea field
    $("textarea").text(str.toLowerCase().replace(/ /g,"_"));
  }
});

// Copy to clipboard button function
$('#copy-to-clipboard').on( "click", function() {
  $("textarea").focus();
  $("textarea").select();
  document.execCommand('copy');
});

// Copyright year
document.getElementById("year").innerHTML = new Date().getFullYear();
