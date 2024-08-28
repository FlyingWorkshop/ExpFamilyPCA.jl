var documenterSearchIndex = {"docs":
[{"location":"api/#API-Documentation","page":"API Documentation","title":"API Documentation","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"CurrentModule = ExpFamilyPCA","category":"page"},{"location":"api/#Contents","page":"API Documentation","title":"Contents","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"Pages = [\"api.md\"]","category":"page"},{"location":"api/#Index","page":"API Documentation","title":"Index","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"Pages = [\"api.md\"]","category":"page"},{"location":"api/#Functions","page":"API Documentation","title":"Functions","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"EPCA\nfit!\ncompress\ndecompress","category":"page"},{"location":"api/#ExpFamilyPCA.EPCA","page":"API Documentation","title":"ExpFamilyPCA.EPCA","text":"NOTE: μ must be in the range of g, so g⁻¹(μ) is finite. It is up to the user to enforce this.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExpFamilyPCA.fit!","page":"API Documentation","title":"ExpFamilyPCA.fit!","text":"fit!(epca::EPCA, X::AbstractMatrix{T}; maxiter::Integer = 100, verbose::Bool = false, steps_per_print::Integer = 10) where T <: Real\n\nFits the Exponential Family Principal Component Analysis (EPCA) model to the given dataset X.\n\nThe fit! function optimizes the parameters of an EPCA model to minimize a loss function specific to the chosen exponential family distribution of the data. This optimization process adjusts the model's internal parameters to achieve a lower-dimensional representation of the data that captures the most significant variance while adhering to the constraints of the distribution family.\n\nArguments\n\nepca::EPCA: An instance of the EPCA model. This object specifies the structure of the model and the assumptions about the distribution of the input data. It must be an instance of a subtype of the abstract type EPCA.\nX::AbstractMatrix{T}: The input data matrix where each row represents an observation and each column represents a feature or variable. T is a subtype of Real, indicating that the data should consist of real numbers (e.g., Float64, Float32).\n\nKeyword Arguments\n\nmaxiter::Integer = 100: The maximum number of iterations to perform during the optimization process. Each iteration updates the model parameters to reduce the loss function. Defaults to 100.\nverbose::Bool = false: A flag indicating whether to print progress information during the optimization process. If set to true, the function prints the loss value and iteration number at specified intervals (steps_per_print). Defaults to false.\nsteps_per_print::Integer = 10: The number of iterations between printed progress updates when verbose is set to true. For example, if steps_per_print is 10, progress will be printed every 10 iterations. Defaults to 10.\n\nReturns\n\nA::AbstractMatrix{T}: The optimized auxiliary parameter matrix A that minimizes the loss function for the model. This matrix represents the lower-dimensional representation of the input data X in the reduced space defined by the EPCA model. The matrix A can be used for further data compression and reconstruction tasks.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 100  # Input dimension\noutdim = 10  # Reduced output dimension\nG = x -> log(1 + exp(x))  # Log-partition function for Bernoulli data\ng = x -> 1 / (1 + exp(-x))  # Sigmoid link function\n\n# Create an EPCA model instance\nepca_model = EPCA(indim, outdim, G, g, Val((:G, :g)))\n\n# Generate some random input data\nX = rand(Float64, 1000, indim)  # 1000 observations, each with 100 features\n\n# Fit the model to the data\nA = fit!(epca_model, X; maxiter=200, verbose=true, steps_per_print=20)\n\n# The resulting matrix A is the lower-dimensional representation of X\n\nNotes\n\nIt is recommended to preprocess the input data X (e.g., normalization or scaling) to ensure better convergence and numerical stability during optimization.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.compress","page":"API Documentation","title":"ExpFamilyPCA.compress","text":"compress(epca::EPCA, X::AbstractMatrix{T}; maxiter::Integer = 100, verbose::Bool = false, steps_per_print::Integer = 10) where T <: Real\n\nCompresses the input data X using a fitted Exponential Family Principal Component Analysis (EPCA) model.\n\nThe compress function projects the input data X into a lower-dimensional space defined by the fitted EPCA model. This compression process reduces the dimensionality of the data while preserving its most significant features, as dictated by the model's parameters and the underlying exponential family distribution.\n\nArguments\n\nepca::EPCA: A pre-fitted instance of the EPCA model. This object should have its parameters already optimized by a prior call to fit!, specifying the structure of the model and the distributional assumptions of the data.\nX::AbstractMatrix{T}: The input data matrix to be compressed, where each row represents an observation and each column represents a feature. T must be a subtype of Real, indicating the data consists of real numbers (e.g., Float64, Float32).\n\nKeyword Arguments\n\nmaxiter::Integer = 100: The maximum number of iterations for the optimization process to compress the data. Each iteration updates the auxiliary parameter matrix A to best represent the data in the reduced space. Defaults to 100.\nverbose::Bool = false: A flag indicating whether to print progress information during the compression process. If set to true, the function prints the loss value and iteration number at specified intervals (steps_per_print). Defaults to false.\nsteps_per_print::Integer = 10: The number of iterations between printed progress updates when verbose is set to true. For example, if steps_per_print is 10, progress will be printed every 10 iterations. Defaults to 10.\n\nReturns\n\nA::AbstractMatrix{T}: The compressed representation of the input data X. This matrix A represents the input data in the lower-dimensional space defined by the EPCA model, retaining the essential structure and patterns of the data with reduced dimensionality.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 100  # Input dimension\noutdim = 10  # Reduced output dimension\nG = x -> log(1 + exp(x))  # Log-partition function for Bernoulli data\ng = x -> 1 / (1 + exp(-x))  # Sigmoid link function\n\n# Create and fit an EPCA model instance\nepca_model = EPCA(indim, outdim, G, g, Val((:G, :g)))\nX = rand(Float64, 1000, indim)  # Generate some random input data\nfit!(epca_model, X; maxiter=200, verbose=true)\n\n# Compress the data using the fitted model\nA_compressed = compress(epca_model, X; maxiter=100, verbose=true, steps_per_print=20)\n\n# The resulting matrix A_compressed is the lower-dimensional representation of X\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.decompress","page":"API Documentation","title":"ExpFamilyPCA.decompress","text":"decompress(epca::EPCA, A::AbstractMatrix{T}) where T <: Real\n\nReconstructs the original data from its compressed form using a fitted Exponential Family Principal Component Analysis (EPCA) model.\n\nThe decompress function takes a compressed representation A of the data and reconstructs an approximation of the original data in its full-dimensional space. This reconstruction is based on the learned parameters of the EPCA model, which captures the underlying patterns and structure of the original dataset.\n\nArguments\n\nepca::EPCA: A fitted instance of the EPCA model. This object should have been optimized with a prior call to fit! and should reflect the structure and distributional assumptions of the original data.\nA::AbstractMatrix{T}: The compressed data matrix, where each row represents a lower-dimensional observation and each column represents a reduced feature. T must be a subtype of Real, indicating the data consists of real numbers (e.g., Float64, Float32).\n\nReturns\n\nX̂::AbstractMatrix{T}: The reconstructed data matrix in its original dimensionality. This matrix X̂ is an approximation of the original input data X, reconstructed using the parameters of the EPCA model.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 100  # Input dimension\noutdim = 10  # Reduced output dimension\nG = x -> log(1 + exp(x))  # Log-partition function for Bernoulli data\ng = x -> 1 / (1 + exp(-x))  # Sigmoid link function\n\n# Create and fit an EPCA model instance\nepca_model = EPCA(indim, outdim, G, g, Val((:G, :g)))\nX = rand(Float64, 1000, indim)  # Generate some random input data\nfit!(epca_model, X; maxiter=200, verbose=true)\n\n# Compress the data using the fitted model\nA_compressed = compress(epca_model, X; maxiter=100, verbose=true, steps_per_print=20)\n\n# Decompress the data to approximate the original data\nX_reconstructed = decompress(epca_model, A_compressed)\n\n# The resulting matrix X_reconstructed is an approximation of the original data X\n\nNotes\n\nThe decompression process uses the link function g` defined in the EPCA model to transform the natural parameters back into the mean parameters of the distribution.\nThis function assumes that the input A` is a valid compressed representation obtained via the compress function with the same EPCA model.\n\n\n\n\n\n","category":"function"},{"location":"api/#Off-the-Shelf-Models","page":"API Documentation","title":"Off-the-Shelf Models","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"NormalEPCA\nPoissonEPCA\nBernoulliEPCA\nGammaEPCA","category":"page"},{"location":"api/#ExpFamilyPCA.NormalEPCA","page":"API Documentation","title":"ExpFamilyPCA.NormalEPCA","text":"NormalEPCA(indim::Integer, outdim::Integer; μ = 1, ϵ = eps())\n\nConstructs an Exponential Family Principal Component Analysis (EPCA) model tailored for normally-distributed (Gaussian) data.\n\nThe NormalEPCA function creates an EPCA model designed for continuous data that follows a normal distribution. This model is equivalent to the generic Principal Component Analysis (PCA), as it minimizes the squared Euclidean distance, which is appropriate for Gaussian-distributed data.\n\nArguments\n\nindim::Integer: The dimensionality of the input data (number of features). This represents the original high-dimensional space of the normally-distributed data.\noutdim::Integer: The dimensionality of the output (reduced space). This is the target lower-dimensional representation the data will be compressed into.\n\nKeyword Arguments\n\nμ::Real = 1: The regularization parameter representing the mean of the normal distribution. Defaults to 1.\nϵ::Real = eps(): A small positive value added for numerical stability, particularly to avoid issues during the optimization process. Defaults to eps(), which is the smallest representable positive number such that 1.0 + eps() is distinguishable from 1.0.\n\nReturns\n\nepca::EPCA: An instance of the EPCA model initialized for normally-distributed data. This model can be fitted to Gaussian data using functions like fit!, and can then be used for data compression or reconstruction.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 100  # Input dimension (number of features)\noutdim = 10  # Reduced output dimension (number of principal components)\n\n# Create a Normal EPCA model instance\nnormal_epca_model = NormalEPCA(indim, outdim; μ=1.0, ϵ=1e-6)\n\n# Generate some random normally-distributed data\nX = randn(1000, indim)  # 1000 observations, each with 100 features (Gaussian)\n\n# Fit the model to the data\nA = fit!(normal_epca_model, X; maxiter=200, verbose=true)\n\n# The resulting matrix A is the lower-dimensional representation of X\n\nNotes\n\nThe Bregman divergence function B_F(p q) = (p-q)^2  2 computes half of the squared Euclidean distance, which is equivalent to the loss function minimized in PCA.\nThe link function g is the identity function, making this model equivalent to classical PCA for Gaussian data.\nThe NormalEPCA function is synonymous with generic PCA but formulated within the EPCA framework.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.PoissonEPCA","page":"API Documentation","title":"ExpFamilyPCA.PoissonEPCA","text":"PoissonEPCA(indim::Integer, outdim::Integer; μ = 1, ϵ = eps())\n\nConstructs an Exponential Family Principal Component Analysis (EPCA) model tailored for Poisson-distributed data.\n\nThe PoissonEPCA function creates an EPCA model designed to handle count data, assuming a Poisson distribution. This model minimizes the Bregman divergence based on the Poisson log-likelihood, making it suitable for datasets where each entry represents a non-negative integer count (e.g., event counts, word counts in documents).\n\nArguments\n\nindim::Integer: The dimensionality of the input data (number of features). This represents the original high-dimensional space of the count data.\noutdim::Integer: The dimensionality of the output (reduced space). This is the target lower-dimensional representation the data will be compressed into.\n\nKeyword Arguments\n\nμ::Real = 1: The regularization parameter representing the expected mean of the Poisson distribution. Must be a positive value, as it corresponds to the mean of the distribution. Defaults to 1.\nϵ::Real = eps(): A small positive value added for numerical stability, especially to avoid logarithms of zero during the optimization process. Defaults to eps(), which is the smallest representable positive number such that 1.0 + eps() is distinguishable from 1.0.\n\nReturns\n\nepca::EPCA: An instance of the EPCA model initialized for Poisson-distributed data. This model can be fitted to count data using functions like fit!, and can then be used for data compression or reconstruction.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 50  # Input dimension (number of features)\noutdim = 5  # Reduced output dimension (number of principal components)\n\n# Create a Poisson EPCA model instance\npoisson_epca_model = PoissonEPCA(indim, outdim; μ=1.0, ϵ=1e-6)\n\n# Generate some random count data\nX = rand(Poisson(1.0), 1000, indim)  # 1000 observations, each with 50 features (counts)\n\n# Fit the model to the count data\nA = fit!(poisson_epca_model, X; maxiter=200, verbose=true)\n\n# The resulting matrix A is the lower-dimensional representation of X\n\nNotes\n\nThe link function g(θ) = exp(θ) is the exponential function, which is appropriate for modeling Poisson-distributed data.\n\nThe function F(x) computes the Bregman divergence for the Poisson distribution, which is based on the Poisson log-likelihood. The parameter μ` must be positive to ensure it is in the valid range for the mean of a Poisson distribution.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.BernoulliEPCA","page":"API Documentation","title":"ExpFamilyPCA.BernoulliEPCA","text":"BernoulliEPCA(indim::Integer, outdim::Integer; μ = 0.5, ϵ = eps())\n\nConstructs an Exponential Family Principal Component Analysis (EPCA) model tailored for Bernoulli-distributed data.\n\nThe BernoulliEPCA function creates an EPCA model that is specifically designed to handle binary data, assuming a Bernoulli distribution. The model is based on minimizing the Bregman divergence with respect to the Bernoulli distribution, which is suitable for datasets where each entry represents a binary outcome (e.g., 0 or 1).\n\nArguments\n\nindim::Integer: The dimensionality of the input data (number of features). This represents the original high-dimensional space of the binary data.\noutdim::Integer: The dimensionality of the output (reduced space). This is the target lower-dimensional representation the data will be compressed into.\n\nKeyword Arguments\n\nμ::Real = 0.5: The regularization parameter representing the expected value of the Bernoulli distribution. Must be in the range (0, 1) as it corresponds to a probability. Defaults to 0.5.\nϵ::Real = eps(): A small positive value added for numerical stability. This helps in preventing divisions by zero or logarithms of zero during the optimization process. Defaults to eps(), which is the smallest representable positive number such that 1.0 + eps() is distinguishable from 1.0.\n\nReturns\n\nepca::EPCA: An instance of the EPCA model initialized for Bernoulli-distributed data. This model can be fitted to binary data using functions like fit!, and can then be used for data compression or reconstruction.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 100  # Input dimension (number of features)\noutdim = 10  # Reduced output dimension (number of principal components)\n\n# Create a Bernoulli EPCA model instance\nbernoulli_epca_model = BernoulliEPCA(indim, outdim; μ=0.5, ϵ=1e-6)\n\n# Generate some random binary data\nX = rand(Bool, 1000, indim)  # 1000 observations, each with 100 features (binary)\n\n# Fit the model to the binary data\nA = fit!(bernoulli_epca_model, X; maxiter=200, verbose=true)\n\n# The resulting matrix A is the lower-dimensional representation of X\n\nNotes\n\nThe link function g(θ) = exp(θ)  (1 + exp(θ)) is the sigmoid function, which is appropriate for modeling Bernoulli-distributed data.\nThe function Bg(x θ) = B_F(x g(θ)) computes the Bregman divergence for the Bernoulli distribution.\nThe choice of μ` must be within (0, 1) to ensure it is in the valid range for a probability under the Bernoulli distribution.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.GammaEPCA","page":"API Documentation","title":"ExpFamilyPCA.GammaEPCA","text":"GammaEPCA(indim::Integer, outdim::Integer; μ = 1, ϵ = eps())\n\nConstructs an Exponential Family Principal Component Analysis (EPCA) model tailored for Gamma-distributed data.\n\nThe GammaEPCA function creates an EPCA model designed to handle continuous positive data, assuming a Gamma distribution. This model minimizes the Bregman divergence specific to the Gamma distribution, making it suitable for datasets where each entry represents a positive continuous variable (e.g., financial data, durations).\n\nArguments\n\nindim::Integer: The dimensionality of the input data (number of features). This represents the original high-dimensional space of the positive continuous data.\noutdim::Integer: The dimensionality of the output (reduced space). This is the target lower-dimensional representation the data will be compressed into.\n\nKeyword Arguments\n\nμ::Real = 1: The regularization parameter representing the mean parameter for the Gamma distribution. It must be nonzero as it influences the range of the link function g(θ) = -1/θ. Defaults to 1.\nϵ::Real = eps(): A small positive value added for numerical stability, particularly to avoid division by zero or logarithms of zero during the optimization process. Defaults to eps(), which is the smallest representable positive number such that 1.0 + eps() is distinguishable from 1.0.\n\nReturns\n\nepca::EPCA: An instance of the EPCA model initialized for Gamma-distributed data. This model can be fitted to positive continuous data using functions like fit!, and can then be used for data compression or reconstruction.\n\nExamples\n\n# Import the module\nusing ExpFamilyPCA\n\n# Define the EPCA model parameters\nindim = 50  # Input dimension (number of features)\noutdim = 5  # Reduced output dimension (number of principal components)\n\n# Create a Gamma EPCA model instance\ngamma_epca_model = GammaEPCA(indim, outdim; μ=1.0, ϵ=1e-6)\n\n# Generate some random positive continuous data\nX = rand(Gamma(2.0, 1.0), 1000, indim)  # 1000 observations, each with 50 features (positive continuous values)\n\n# Fit the model to the data\nA = fit!(gamma_epca_model, X; maxiter=200, verbose=true)\n\n# The resulting matrix A is the lower-dimensional representation of X\n\nNotes\n\nThe Bregman divergence function Bg(x θ) = -x * θ - log(-x * θ) - 1 is specifically designed for the Gamma distribution.\nThe link function g(θ) = -1θ is appropriate for modeling Gamma-distributed data.\nThe parameters for initialization are set to ensure that the product of matrices AV results in only negative entries, adhering to the domain requirements of the Gamma distribution.\n\n\n\n\n\n","category":"function"},{"location":"api/#Aliases","page":"API Documentation","title":"Aliases","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"GaussianEPCA\nItakuraSaitoEPCA","category":"page"},{"location":"api/#ExpFamilyPCA.GaussianEPCA","page":"API Documentation","title":"ExpFamilyPCA.GaussianEPCA","text":"Alias for NormalEPCA.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExpFamilyPCA.ItakuraSaitoEPCA","page":"API Documentation","title":"ExpFamilyPCA.ItakuraSaitoEPCA","text":"Alias for GammaEPCA.\n\n\n\n\n\n","category":"function"},{"location":"api/#Miscellaneous","page":"API Documentation","title":"Miscellaneous","text":"","category":"section"},{"location":"api/","page":"API Documentation","title":"API Documentation","text":"EPCACompressor","category":"page"},{"location":"api/#ExpFamilyPCA.EPCACompressor","page":"API Documentation","title":"ExpFamilyPCA.EPCACompressor","text":"Compressor from [CompressedBeliefMDPs.jl](https://juliapomdp.github.io/CompressedBeliefMDPs.jl/stable/).\n\n\n\n\n\n","category":"type"},{"location":"gamma/","page":"-","title":"-","text":"The cumulant of the gamma distribution is G(theta) = -log(-theta), so the the link function (its derivative) is g(theta) = nabla_theta G(theta) = -frac1theta. From the Legendre transform, we know that f(x) = g^-1(x) = -frac1x and ","category":"page"},{"location":"gamma/","page":"-","title":"-","text":"beginaligned\nF(x) \n= theta cdot x - G(theta) \n= f(x) cdot x - G(f(x)) \n= -1 - log(x)\nendaligned","category":"page"},{"location":"gamma/","page":"-","title":"-","text":"The Bregman divergence induced from F is","category":"page"},{"location":"gamma/","page":"-","title":"-","text":"beginaligned\nB_F(p q) \n= F(p) - F(q) - langle f(q) p - q rangle \n= -1 - log p + 1 + log q + Biglangle frac1q p - q Bigrangle \n= fracpq - log fracpq - 1\nendaligned","category":"page"},{"location":"gamma/","page":"-","title":"-","text":"so  B_F is the Itakura-Saito distance as desired. Further, the EPCA objective is","category":"page"},{"location":"gamma/","page":"-","title":"-","text":"beginaligned\nB_F(x g(theta)) = fracpg(theta) - log fracpg(theta) - 1 = -ptheta - log(-ptheta) - 1\nendaligned","category":"page"},{"location":"bregman/#Bregman-Divergences","page":"Bregman Divergences","title":"Bregman Divergences","text":"","category":"section"},{"location":"bregman/#Definition","page":"Bregman Divergences","title":"Definition","text":"","category":"section"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"A Bregman divergence B_F (Bregman, 1967) is defined with respect to a strictly convex and differentiable function F Omega to mathbbR, by ","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"\nB_F(p q) = F(p) - F(q) - langle f(p) p - q rangle\n\n\nwhere langle  rangle denotes an inner product and f(x) = nabla_x F(x) Intuitively the Bregman divergence expresses the difference between at p between F and its first-order Taylor expansion about q We use Bregman divergences to measure the difference between two probability distributions The Bregman divergence is also sometimes called the Bregman distance but it is not a metric since it is usually satisfies neither symmetry nor the triangle inequality\n\n Relationship to the Exponential Family\n\n The Exponential Family\n\nA distribution is said to be in the natural *exponential family* if its density can be written\n\n\np(x  theta) = P_0(x) exp(langle x theta rangle - G(theta) )\n\n\nwhere x and theta are vectors in mathbbR^d P_0 is a known function that does not depend on theta and G is the log-partition function  Intuitively the log-parition function ensure that the p is a valid distribution meaning it integrates to 1\n\n\nG(theta) = log int P_0(x) exp(langle x theta rangle) dx\n\n\nWe call theta the *natural parameter* and mu = mathbbE_theta sim p(cdot theta)x the *expectation parameter* For the exponential family (and assuming some standard regularity conditions) we have mu = nabla_theta G(theta) equiv g(theta) GLM azoury(cite) Since G is strictly convex we can also define the inverse g^-1(mu) equiv theta\n\n The Legendre Transform and Parameter Duality\n\nTo understand the relationship between expectation parameters and natural parameters first recall the Legendre transform from physics For a convex function h the Legendre transform is \n\n\nh^*(tildex) equiv tildex cdot x - f(x)\n\n\nWe say that h^* is the *dual* of h Let F be the dual G\n\n\nF(mu) equiv langle mu theta rangle - G(theta)\n\n\nObserve that the gradient of the dual is the inverse of gradient of the log-partition\n\nbeginaligned\n\nf(mu) \nequiv nabla_mu F(mu) \n= nabla_mu Big langle mu theta rangle - G(theta)Big \n= theta + langle mu nabla_mu theta rangle - langle g(theta) nabla_mu theta rangle text(theta is a function of mu)\n= theta text(mu = g(theta)) \n= g^-1(mu)\nendaligned","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"In summary, the paramaterizations are related by the Legendre transformations ","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"$","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"\\nabla_\\theta G(\\theta) = g(\\theta) = \\mu $","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"and","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"$","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"\\nabla\\mu F(\\mu) = f(\\mu) = \\theta. $","category":"page"},{"location":"bregman/#Bregman-Divergences-as-Loss-Functions","page":"Bregman Divergences","title":"Bregman Divergences as Loss Functions","text":"","category":"section"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"The key relationship between members of the exponential family and the Bregman divergence is this: minimizing the negative log-lilihood of p(x theta) is equivalent to minimizing the Bregman divergence B_F. To see this, first recall that the negative log-liklihood for members of the exponential family is G(theta) - langle x theta rangle. ","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"$","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"\\langle x, \\theta \\rangle - G(\\theta). $","category":"page"},{"location":"bregman/","page":"Bregman Divergences","title":"Bregman Divergences","text":"goal: explain the derivation of epca1-4","category":"page"},{"location":"math/#Math-Details","page":"Math","title":"Math Details","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"The goal of this page is to introduce and motivate exponential family principal component analysis (EPCA) (Collins et al., 2001). This guide is accessible to anyone with knowledge of basic multivariable calculus and linear algebra (e.g., gradients, matrix rank).[1] To ensure that readers can follow the math, we will write out every step and claim in exhaustive detail. We invite readers seeking a more concise, formal presentation of EPCA to explore the original paper.","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"[1]: If you are not yet familiar with these concepts, I suggest exploring these resources on gradients and matrix ranks.","category":"page"},{"location":"math/#Principal-Component-Analysis-(PCA)","page":"Math","title":"Principal Component Analysis (PCA)","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"Principal component analysis (Pearson, 1901) is an extremely popular dimensionality reduction technique. It has been invented by several researchers throughout its history and appears across many fields. There are many interpretations and derivations of PCA, but we will only discuss two here. The first is PCA as a low-rank matrix approximation problem; the second is as a Gaussian denoising problem. ","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"PCA (Pearson, 1901) is a powerful dimensionality reduction technique that transforms high-dimensional data into a lower-dimensional subspace while retaining as much variability as possible. It accomplishes this by identifying the directions of maximum variance in the data, known as principal components, and projecting the data onto these new orthogonal axes. PCA finds extensive applications in various domains, including data visualization, noise reduction, feature extraction, and exploratory data analysis.","category":"page"},{"location":"math/#Low-Rank-Matrix-Approximation","page":"Math","title":"Low-Rank Matrix Approximation","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"PCA can be formulated as an low-rank matrix approximation problem. For a data matrix X, we want to find low-dimensional approximation Theta that minimizes the the sum of the squared Euclidean distances. Formally, we write","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"beginaligned\n undersetThetatextminimize\n  X - Theta_F \n textsubject to\n  mathrmrankleft(Thetaright) leq ell\nendaligned","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"where  cdot _F is the Frobenius norm. Observe that the objective is equivalent to maximizing the log likelihood of a Gaussian model. Consequently, PCA can be viewed as a denoising procedure that recovers the true low-dimensional signal Theta from a normally noised high-dimensional measurement X. ","category":"page"},{"location":"math/#Gaussian-Denoising","page":"Math","title":"Gaussian Denoising","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"TODO: include image from presentation","category":"page"},{"location":"math/#Exponential-Family-PCA-(EPCA)","page":"Math","title":"Exponential Family PCA (EPCA)","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"EPCA is an extension of PCA analogous to how generalized linear models (McCullagh and Nelder, 1989) extend linear regression. In particular, EPCA can denoise from any exponential family. Collins et al. (2001) showed that maximizing the log likelihood of any exponential family is directly related to minimizing the Bregman divergence","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"beginaligned \nB_F(p  q) equiv F(p) - F(q) - f(q)(p - q) \nendaligned","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"where ","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"beginaligned\n    f(mu) equiv nabla_mu F(mu) \n    F(mu) equiv theta cdot g(theta) - G(theta)\nendaligned","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"and g is the link function, g(theta) = nabla_theta G(theta), and mu = g(theta). In other words, F is the convex dual of cumulant \\citep{azoury2001relative}. We can now express the general formulation of the EPCA problem. For any differentiable convex function G, the EPCA problem is","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"beginaligned\n undersetThetatextminimize\n  B_Fleft(X  g(Theta) right)\nendaligned","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"where g is applied elementwise across Theta and B_F is the generalized Bregman divergence. Unfortunately, the optimal convergence constraints of the general problem remain unsolved. As such, in practice we minimize a different objective","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"beginaligned\n undersetThetatextminimize\n  B_Fleft(X  g(Theta) right) + epsilon B_Fleft(mu_0  g(Theta)right)\nendaligned","category":"page"},{"location":"math/","page":"Math","title":"Math","text":"where mu_0 in any value in mathrmrange(g) and epsilon is some small positive constant.","category":"page"},{"location":"math/#References","page":"Math","title":"References","text":"","category":"section"},{"location":"math/","page":"Math","title":"Math","text":"Bregman, L. (1967). The relaxation method of finding the common point of convex sets and its application to the solution of problems in convex programming. USSR Computational Mathematics and Mathematical Physics 7, 200–217.\n\n\n\nCollins, M.; Dasgupta, S. and Schapire, R. E. (2001). A Generalization of Principal Components Analysis to the Exponential Family. Advances in Neural Information Processing Systems 14.\n\n\n\nMcCullagh, P. and Nelder, J. A. (1989). Generalized Linear Models. 2 Edition, Chapman & Hall/CRC Monographs on Statistics and Applied                Probability (Chapman & Hall/CRC, Philadelphia, PA).\n\n\n\nPearson, K. (1901). On Lines and Planes of Closest Fit to Systems of Points in Space. Philosophical Magazine 2, 559–572.\n\n\n\n","category":"page"},{"location":"#ExpFamilyPCA.jl-Documentation","page":"ExpFamilyPCA.jl","title":"ExpFamilyPCA.jl Documentation","text":"","category":"section"},{"location":"","page":"ExpFamilyPCA.jl","title":"ExpFamilyPCA.jl","text":"This is some text.","category":"page"}]
}
