#!/bin/bash

############################################################
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo -e "\nCheck file formatting relative to cwd"
   echo
   echo -e "\u001b[37;1mUsage\u001b[0m\n"
   echo -e "  $ check-formatting\n"
   echo -e "  $ check-formatting -s #staged files only\n"
   echo
}


############################################################
############################################################
# Main program                                             #
############################################################
############################################################
############################################################
# Process the input options. Add options as needed.        #
############################################################
# Get the options
while getopts ":sh" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      s) # check staged files only
         STAGED=true
         ;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done

if [ "$STAGED" == true ]; then
  FILES=$(git diff --relative --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
  [ -z "$FILES" ] && exit 0
else 
  FILES='.'
fi

echo $FILES | xargs pnpm exec prettier --ignore-unknown --check 

