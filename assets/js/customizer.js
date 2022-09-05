/* global wp, jQuery */
/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
 window.document.onkeydown = function(e) {
	if (!e) {
	  e = event;
	}
	if (e.keyCode == 0) {
	  lightbox_close();
	}
  }
  
  function lightbox_open() {
	var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  //   window.scrollTo(0, 0);
	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';
	lightBoxVideo.play();
  }
  
  function lightbox_close() {
	var lightBoxVideo = document.getElementById("VisaChipCardVideo");
	document.getElementById('light').style.display = 'none';
	document.getElementById('fade').style.display = 'none';
	lightBoxVideo.pause();
  }

( function( $ ) {
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			} else {
				$( '.site-title, .site-description' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
				$( '.site-title a, .site-description' ).css( {
					color: to,
				} );
			}
		} );
	} );
}( jQuery ) );
