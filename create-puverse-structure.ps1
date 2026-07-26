$folders = @(
# Root
"frontend",
"backend",
"docs",
"infrastructure",
".github/workflows",

# Frontend
"frontend/app",
"frontend/components",
"frontend/components/ui",
"frontend/components/shared",
"frontend/components/layouts",
"frontend/components/features",
"frontend/hooks",
"frontend/lib",
"frontend/services",
"frontend/store",
"frontend/providers",
"frontend/types",
"frontend/utils",
"frontend/constants",
"frontend/styles",
"frontend/public",

# Backend
"backend/src/main/java/com/puverse",
"backend/src/main/java/com/puverse/config",
"backend/src/main/java/com/puverse/security",

"backend/src/main/java/com/puverse/common",
"backend/src/main/java/com/puverse/common/constants",
"backend/src/main/java/com/puverse/common/dto",
"backend/src/main/java/com/puverse/common/enums",
"backend/src/main/java/com/puverse/common/exceptions",
"backend/src/main/java/com/puverse/common/response",
"backend/src/main/java/com/puverse/common/utils",

"backend/src/main/java/com/puverse/modules",

"backend/src/main/java/com/puverse/integrations",
"backend/src/main/java/com/puverse/integrations/cloudinary",
"backend/src/main/java/com/puverse/integrations/email",
"backend/src/main/java/com/puverse/integrations/redis",
"backend/src/main/java/com/puverse/integrations/resend",

"backend/src/main/java/com/puverse/scheduler",

"backend/src/main/resources",
"backend/src/main/resources/db",
"backend/src/main/resources/db/migration",
"backend/src/main/resources/static",
"backend/src/main/resources/templates",

"backend/src/test/java/com/puverse",

"backend/docker",
"backend/scripts",

# Docs
"docs/architecture",
"docs/api",
"docs/database",
"docs/ui-ux",
"docs/prd",
"docs/assets",

# Infrastructure
"infrastructure/docker",
"infrastructure/nginx",
"infrastructure/postgres",
"infrastructure/redis",
"infrastructure/monitoring"
)

$modules = @(
"auth",
"user",
"role",
"organization",
"event",
"registration",
"ticket",
"attendance",
"certificate",
"notification",
"eventstaff",
"dashboard",
"analytics"
)

$subFolders = @(
"controller",
"service",
"service/impl",
"repository",
"entity",
"dto/request",
"dto/response",
"mapper",
"validator",
"specification",
"events"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

foreach ($module in $modules) {
    foreach ($sub in $subFolders) {
        New-Item -ItemType Directory -Force -Path "backend/src/main/java/com/puverse/modules/$module/$sub" | Out-Null
    }
}

$files = @(
".gitignore",
".env.example",
"README.md",
"LICENSE",
"docker-compose.yml",

"frontend/package.json",
"frontend/tsconfig.json",
"frontend/next.config.ts",
"frontend/middleware.ts",

"backend/pom.xml",
"backend/Dockerfile",
"backend/src/main/resources/application.yml",
"backend/src/main/resources/application-dev.yml",
"backend/src/main/resources/application-prod.yml",
"backend/src/main/java/com/puverse/PuverseApplication.java"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host ""
Write-Host "===================================="
Write-Host " PUVerse project created successfully"
Write-Host "===================================="