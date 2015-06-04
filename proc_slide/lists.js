(function( slide, undefined ) {

    var List = slide.Text.extend({

        create: function( txt, font, orig, scale, warp ) {
            slide.Text.prototype.create.call( this, txt, font, orig, scale, warp );
            this.line_sep = 5;
        },

        render: function() {
            this.pjs.pushStyle();
            this.pjs.textFont( this.font );
            this.pjs.textSize( 32 );
            this.pjs.strokeWeight( 1 );
            var lh = this.pjs.textAscent() + this.pjs.textDescent();
            var y = 0, s = 8;
            for( var ii = 0; ii < this.txt.length; ++ii ) {
                // this.pjs.line( 0, y, 5, y );
                // this.pjs.line( 0, y, 0, y + 5 );
                this.pjs.ellipse( 0, y - 0.35*lh, s, s );
                this.pjs.text( this.txt[ii], 1.5*s, y );
                y += lh + this.line_sep;
            }
            this.pjs.popStyle();
        }
    });

    slide.List = List;

}( window.slide = window.slide || {} ));
