#include<iostream>
using namespace std;
int main(){
    int n;
    cin>>n;

    int a[n];
    for(int i=0;i<n;i++){
        cout<<"input the value of element at index "<<i<<endl;
        cin>>a[i];
    }
    //54 78 96 77 82 
    for(int i=0;i<n;i++){
        if(a[i]==77){
            cout<<i;
        }
    }
}
