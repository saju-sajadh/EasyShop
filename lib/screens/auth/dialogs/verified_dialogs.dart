import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../components/skeleton.dart';


class VerifiedDialog extends StatelessWidget {
  const VerifiedDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          vertical: 15 * 3,
          horizontal: 15,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.35,
              child: const AspectRatio(
                aspectRatio: 1 / 1,
                child: NetworkImageWithLoader(
                  'https://i.imgur.com/vF1jB6b.png',
                  fit: BoxFit.contain,
                ),
              ),
            ),
            const SizedBox(height: 15),
            Text(
              'Verified!',
              style: Theme.of(context)
                  .textTheme
                  .headlineSmall
                  ?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 15),
            const Text(
              'Hurrah!!  You have successfully\nverified the account.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () =>
                    Navigator.pushNamed(context, '/'),
                child: const Text('Browse Home'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}



class NetworkImageWithLoader extends StatelessWidget {
  final BoxFit fit;

  /// This widget is used for displaying network image with a placeholder
  const NetworkImageWithLoader(
    this.src, {
    super.key,
    this.fit = BoxFit.cover,
    this.radius = 15,
    this.borderRadius,
  });

  final String src;
  final double radius;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius ?? BorderRadius.all(Radius.circular(radius)),
      child: CachedNetworkImage(
        fit: fit,
        imageUrl: src,
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: fit,
            ),
          ),
        ),
        placeholder: (context, url) => const Skeleton(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      ),
    );
  }
}

