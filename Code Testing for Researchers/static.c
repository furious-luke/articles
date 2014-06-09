#include <stdio.h>

// Convert an integer to a string.
char* scope_var( int val ) {
   char buf[3];
   sprintf( buf, "val=%d", val );
   return buf;
}

// Print the integer "10".
int main() {
   printf( "%s", scope_var( 10 ) );
   return 0;
}
