# ============================================
# Development Environment
# ============================================

.PHONY: build-development
build-development: ## [DEV] Build the development docker image
	docker compose -f docker/development/compose.yaml build
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: start-development
start-development: ## [DEV] Start the development docker container
	docker compose -f docker/development/compose.yaml up -d

.PHONY: stop-development
stop-development: ## [DEV] Stop the development docker container
	docker compose -f docker/development/compose.yaml down

.PHONY: rebuild-development
rebuild-development: ## [DEV] Rebuild and restart development container
	docker compose -f docker/development/compose.yaml up -d --build --force-recreate
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: deploy-development
deploy-development: ## [DEV] Deploy to development server
	@./docker/deploy.sh development

# ============================================
# Staging Environment
# ============================================

.PHONY: build-staging
build-staging: ## [STG] Build the staging docker image
	docker compose -f docker/staging/compose.yaml build
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: start-staging
start-staging: ## [STG] Start the staging docker container
	docker compose -f docker/staging/compose.yaml up -d

.PHONY: stop-staging
stop-staging: ## [STG] Stop the staging docker container
	docker compose -f docker/staging/compose.yaml down

.PHONY: rebuild-staging
rebuild-staging: ## [STG] Rebuild and restart staging container
	docker compose -f docker/staging/compose.yaml up -d --build --force-recreate
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: deploy-staging
deploy-staging: ## [STG] Deploy to staging server
	@./docker/deploy.sh staging

# ============================================
# Production Environment
# ============================================

.PHONY: build-production
build-production: ## [PRD] Build the production docker image
	docker compose -f docker/production/compose.yaml build
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: start-production
start-production: ## [PRD] Start the production docker container
	docker compose -f docker/production/compose.yaml up -d

.PHONY: stop-production
stop-production: ## [PRD] Stop the production docker container
	docker compose -f docker/production/compose.yaml down

.PHONY: rebuild-production
rebuild-production: ## [PRD] Rebuild and restart production container
	docker compose -f docker/production/compose.yaml up -d --build --force-recreate
	@echo "Cleaning up dangling images..."
	@docker image prune -f

.PHONY: deploy-production
deploy-production: ## [PRD] Deploy to production server
	@./docker/deploy.sh production

# ============================================
# Utility Commands
# ============================================

.PHONY: clean-docker
clean-docker: ## [UTIL] Remove all dangling images and build cache
	@echo "Removing dangling images..."
	@docker image prune -f
	@echo "Removing build cache..."
	@docker builder prune -f
	@echo "Docker cleanup complete!"

.PHONY: clean-all-docker
clean-all-docker: ## [UTIL] Remove ALL unused images, containers, and build cache (careful!)
	@echo "Removing all unused images, containers, volumes, and build cache..."
	@docker system prune -a -f
	@echo "Complete Docker cleanup done!"

.PHONY: help
help: ## [HELP] Show this help message
	@echo ""
	@echo "╔════════════════════════════════════════════════════════════════╗"
	@echo "║              POC-FOS Docker Management Commands                ║"
	@echo "╚════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Development Environment:"
	@grep -E '^[a-zA-Z_-]+:.*?## \[DEV\].*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## \\[DEV\\] "}; {printf "  \033[36m%-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Staging Environment:"
	@grep -E '^[a-zA-Z_-]+:.*?## \[STG\].*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## \\[STG\\] "}; {printf "  \033[33m%-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Production Environment:"
	@grep -E '^[a-zA-Z_-]+:.*?## \[PRD\].*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## \\[PRD\\] "}; {printf "  \033[31m%-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Utility Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## \[UTIL\].*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## \\[UTIL\\] "}; {printf "  \033[35m%-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Usage: make <command>"
	@echo ""
