function showHideDialog2(event) {
    $("#overlay2").show()
}

function closeDialog2(event) {
    $("#overlay2").hide()
}

$(document).ready(function() {
    // $('#myTextarea').focus(function() {
    //     $('#notif').append(`<div id="note"><i>Note: At least 20 words</i></div>`);
    // }).blur(function() {
    //     $('#notif').empty();
    // });

    $("#message").click(function(e) {
        e.preventDefault()
        $('#notif').append(`<div id="note"><i>Note: At least 20 words</i></div>`);
        return false
    })

    $('#toggleButton').click(function() {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
        $('#collapsibleContent').attr('aria-hidden', isExpanded);
        $(this).text(isExpanded ? 'Show More' : 'Show Less');
    });

    $('.tabs button').click(function() {
        // Deselect all tabs and hide all tab panels
        $('.tabs button').attr('aria-selected', 'false');
        $('.tab-content').attr('aria-hidden', 'true');

        // Select the clicked tab and show the associated panel
        $(this).attr('aria-selected', 'true');
        $('#' + $(this).attr('aria-controls')).attr('aria-hidden', 'false');
    });

    const content = [
        "Content for Page 1",
        "Content for Page 2",
        "Content for Page 3",
        "Content for Page 4",
        "Content for Page 5"
    ];

    $('.pagination button').click(function() {
        // Remove aria-current from all buttons
        $('.pagination button').removeAttr('aria-current');

        // Set aria-current to the clicked button
        $(this).attr('aria-current', 'page');

        // Get the page number from the button text
        const pageIndex = $(this).text() - 1;

        // Update the content for the selected page
        $('#content').html('<p>' + content[pageIndex] + '</p>');
    });

    $('.carousel-controls button').click(function() {
        // Find the index of the clicked button
        var index = $(this).index();

        // Update aria-current for buttons
        $('.carousel-controls button').attr('aria-current', 'false');
        $(this).attr('aria-current', 'true');

        // Hide all images and show the selected one
        $('.carousel-images img').attr('aria-hidden', 'true');
        $('.carousel-images img').eq(index).attr('aria-hidden', 'false');
    });

    $('.nav-menu > li > a[aria-haspopup="true"]').on('click', function(e) {
        e.preventDefault();
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
        var targetMenu = '#' + $(this).attr('aria-owns');
        $(targetMenu).toggle();
    });

    // Handle keyboard navigation
    $('.nav-menu > li > a').on('keydown', function(e) {
        var $submenu = $('#' + $(this).attr('aria-owns'));
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        } else if (e.key === 'ArrowDown' && $(this).attr('aria-haspopup')) {
            e.preventDefault();
            $submenu.find('a:first').focus();
        }
    });

    $('.submenu a').on('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            $(this).parent().next().find('a').focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            $(this).parent().prev().find('a').focus();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            $(this).closest('.submenu').prev('a').focus().attr('aria-expanded', 'false');
            $(this).closest('.submenu').hide();
        }
    });

    // Close submenus when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.nav-menu').length) {
            $('.submenu').hide();
            $('.nav-menu > li > a[aria-haspopup="true"]').attr('aria-expanded', 'false');
        }
    });
    
})


