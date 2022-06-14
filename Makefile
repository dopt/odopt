# Tell Make to run 'make help' if the user runs 'make'
# without this, Make would use the first target as the default
.DEFAULT_GOAL := help

SHELL := /bin/bash

help:			## Show this help.
	@echo -e "Welcome to...\n"
	@echo -e "`cat ./dopt.txt`\n"
	@echo -e "\u001b[37;1mCommands\u001b[0m\n"
	@grep -E '^[a-zA-Z\/_-]+:.*?## .*$$' $(MAKEFILE_LIST)\
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[1;96m%-15s\033[0m \033[1;97m%s\033[0m\n", $$1, $$2}'

i: install
install: ## [@alias i] Installs all deps for the monorepo
	yarn; 

u: uninstall
uninstall: ## [@alias u] Removes all node_modules dirs
	find . -name 'node_modules' -type d -prune -exec echo '{}' \;  -exec rm -rf {} \;

b: build
build: ## [@alias b] Builds all packages topologically
t: test
test: ## [@alias t] Run test target for each package
tc: typecheck
typecheck: ## [@alias tc] Run typecheck target for each package
l: lint
lint: ## [@alias l] Run lint target for each package
f: format
format: ## [@alias f] Runs format target for each package
fc: formatcheck
formatcheck: ## [@alias fc] Runs formatcheck target for each package
c: clean
clean: ## [@alias c]Runs clean target for each package
test typecheck lint format formatcheck clean:
	npx turbo run $@;

n: nuke
nuke: clean uninstall ## [@alias n] Removes clean and install for each package
