# Template

# Install .gitattributes
- Source: [Git Attributes repo](https://github.com/gitattributes/gitattributes)
- `.gitattributes` generator: [Gitattributes Generator](https://richienb.github.io/gitattributes-generator/)

## To check if all files have a corresponding rule in .gitattributes, this script can be used:
```sh
missing_attributes=$(git ls-files | git check-attr -a --stdin | grep 'text: auto' || printf '\n')

if [ -n "$missing_attributes" ]; then
  printf '%s\n%s\n' '.gitattributes rule missing for the following files:' "$missing_attributes"
else
  printf '%s\n' 'All files have a corresponding rule in .gitattributes'
fi
```
