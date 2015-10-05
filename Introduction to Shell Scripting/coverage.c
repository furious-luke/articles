#include <stdio.h>

int to_test( int x )
{
   int ii;
   int sum = 0;
   for( ii = 0; ii < 10; ++ii )
   {
      if( x == 0 )
         sum += ii;
      else if( x == 1 )
         sum += 2*ii;
      else
         sum += 3*ii;
   }
   return sum;
}

int main()
{
   to_test( 0 );
   to_test( 2 );
   return 0;
}
