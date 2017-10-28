# Kubernetes Basic Node App
following Kubernetes tutorial for setting up Pod to host node server with Hello World response.

# Setting Up Kubernetes

  - Use brew to install Kuberetes `brew install kubectl`
  - To use Docker for Mac as local VM `—vm-driver=xhyve`
  - To view available contexts for kubernetes `cat ~/.kubuectl/config`
You can also:
  - View cluster `kubectl cluster-info`
  - Debug issues with kube cluster `kubectl cluster-info dump` (prints logs of cluster)

`kubectl` commands: https://kubernetes.io/docs/user-guide/kubectl-overview/

#### Pod
https://kubernetes.io/docs/concepts/workloads/pods/pod/
>A group of one or more containers tied together for networking

* Containers within a pod share IP address and can reach each other via `localhost`
* Pods serve as a unit of deploying, horizontal scaling, and replication
  * **fate sharing** - contianers within a pod share resources, get terminated together if the Pod node is terminated, dependency management handled by indvidual containers.
  * **resource sharing** - containers in a pod can communicate via shared ports, meaning that containers need do coordinate which ports to be available at.
  * **volumes** -pods also contain storage volumes that can survive restarts, and be shared between applications in that pod
    * think cache management, potentially dependency storage

#### Service
https://kubernetes.io/docs/concepts/services-networking/service/
> A resilient load balancing system put in front of pods, to handle scheduling, mapping, and expose external ports for Pods

- `kubectl expose deployment hello-node —type=LoadBalancer` identifies that want to expose Service outside cluster
- Get pod name via `kubectl get pods`
- Print logs of requests with `kubectl logs <POD-NAME>`

## Understanding Kubernetes via Minikube

**tutorial:** https://kubernetes.io/docs/getting-started-guides/minikube/
**github:** https://github.com/kubernetes/minikube
> minikube is a single node Kubernetes VM that runs locally on laptop

1. Start minikube with `minikube start —vm-driver=xhyve`
2. Set kubernetes context for minikube `kubectl config use-context minikube`
    - This will point the minikube to proper kubernetes env
3. Build a small node server, with request processing (`server.js`)
4. Build Dockerfile specifying
   - Node driver
   - port
   - need server file
   - command to run server
5. Enable Docker to build images locally for minikube `eval $(minikube docker-env`
    - to remove docker env from minikube (for deployments outside minikube) `eval $(minikube dokcer-env -u)`
6. Build image from minikube `docker build -t <TAGNAME>:v1 .`
    -  -t flag allows you to name the image (tag)
7. To run a deployment `kubectl run <TAGNAME> —image=<TAGNAME>:v1 ==port=8080`
    - kubectl run takes a job name, can specify an imageID and a portnumber
8. View deployment: `kubectl get deployments`
9. Ditto with pods: `kubectl get pods`

#### Updating App:
> Ok, that worked great, so I added more..... now what?

1. Build new image `docker build -t <tagName>:v2`
2. Update the image for deployment `kubectl set image deployement/<TAGNAME> <TAGNAME>=<TAGNAME>:v2`
3. Run service `kubectl run <TAGNAME>`

#### Clean up
> That was fun, now I want to test it on a real service!

1.  Delete Service `kubectl delete service hello-node`
2. Delete deployment `kubectl delete deployment hello-node`
3.  Reset Docker env off minikube `eval $(minikube docker-env -u)`
